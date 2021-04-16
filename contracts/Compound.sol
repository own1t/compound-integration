// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CTokenInterface.sol";
import "./CETHInterface.sol";
import "./ComptrollerInterface.sol";
import "./PriceOracleInterface.sol";

contract Compound {
    ComptrollerInterface public comptroller;
    PriceOracleInterface public priceOracle;
    CETHInterface public cETH;

    constructor(
        address _comptroller,
        address _priceOracle,
        address _cETHAddress
    ) {
        comptroller = ComptrollerInterface(_comptroller);
        priceOracle = PriceOracleInterface(_priceOracle);
        cETH = CETHInterface(_cETHAddress);
    }

    function _supply(address cTokenAddress, uint256 underlyingAmount) internal {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        address underlyingAddress = cTokenInstance.underlying();
        IERC20 tokenInstance = IERC20(underlyingAddress);

        tokenInstance.approve(cTokenAddress, underlyingAmount);
        uint256 result = cTokenInstance.mint(underlyingAmount);

        require(result == 0, "cToken.mint() failed.");
    }

    function _supplyETH(uint256 underlyingAmount) internal {
        cETH.mint{value: underlyingAmount}();
    }

    function _redeem(address cTokenAddress, uint256 redeemAmount) internal {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        uint256 result = cTokenInstance.redeemUnderlying(redeemAmount);

        require(result == 0, "cToken.redeem() failed.");
    }

    function _redeemETH(uint256 redeemAmount) internal {
        cETH.redeemUnderlying(redeemAmount);
    }

    function _borrow(address cTokenAddress, uint256 borrowAmount) internal {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        uint256 result = cTokenInstance.borrow(borrowAmount);

        require(result == 0, "cToken.borrow() failed.");
    }

    function _borrowETH(uint256 borrowAmount) internal {
        cETH.borrow(borrowAmount);
    }

    function _repayBorrow(address cTokenAddress, uint256 underlyingAmount)
        internal
    {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        address underlyingAddress = cTokenInstance.underlying();
        IERC20 tokenInstance = IERC20(underlyingAddress);
        tokenInstance.approve(cTokenAddress, underlyingAmount);
        uint256 result = cTokenInstance.repayBorrow(underlyingAmount);

        require(result == 0, "cToken.repayBorrow() failed.");
    }

    function _repayBorrowETH(uint256 underlyingAmount) internal {
        cETH.repayBorrow{value: underlyingAmount}();
    }

    function _enterMarket(address cTokenAddress) internal {
        address[] memory markets = new address[](1);
        markets[0] = cTokenAddress;
        uint256[] memory results = comptroller.enterMarkets(markets);

        require(results[0] == 0, "Comptroller.enterMarkets() failed.");
    }

    function _exitMarket(address cTokenAddress) internal {
        uint256 result = comptroller.exitMarket(cTokenAddress);

        require(result == 0, "Comptroller.exitMarket() failed.");
    }

    function _claimComp() internal {
        comptroller.claimComp(address(this));
    }

    function _getCompAddress() public view returns (address) {
        return comptroller.getCompAddress();
    }

    function _getCompBalance() public view returns (uint256) {
        address compAddress = _getCompAddress();
        IERC20 compToken = IERC20(compAddress);
        uint256 compBalance = compToken.balanceOf(address(this));

        return compBalance;
    }

    function _getMaxBorrow(address cTokenAddress)
        internal
        view
        returns (uint256)
    {
        (uint256 error, uint256 liquidity, uint256 shortfall) =
            comptroller.getAccountLiquidity(address(this));

        require(error == 0, "Comptroller.getAccountLiquidity() failed.");
        require(shortfall == 0, "account underwater");
        require(liquidity > 0, "account has excess collateral");

        uint256 underlyingPrice = _getUnderlyingPrice(cTokenAddress);
        uint256 maxBorrowUnderlying = liquidity / underlyingPrice;

        return maxBorrowUnderlying;
    }

    function _getBorrowLimit() internal view returns (uint256) {
        (uint256 result, uint256 liquidity, uint256 shortfall) =
            comptroller.getAccountLiquidity(address(this));
        require(result == 0, "comptroller#getAccountLiquidity() failed.");
        require(shortfall == 0, "account underwater");
        require(liquidity > 0, "account does not have collateral");

        return liquidity;
    }

    function _getSupplyBalance(address cTokenAddress)
        internal
        view
        returns (uint256)
    {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        uint256 supplyBalance = cTokenInstance.balanceOf(address(this));

        return supplyBalance;
    }

    function _getBorrowBalance(address cTokenAddress)
        internal
        returns (uint256)
    {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        uint256 borrowBalance =
            cTokenInstance.borrowBalanceCurrent(address(this));

        return borrowBalance;
    }

    function _getExchangeRate(address cTokenAddress)
        internal
        returns (uint256)
    {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        uint256 exchangeRate = cTokenInstance.exchangeRateCurrent();

        return exchangeRate;
    }

    function _getUnderlyingAddress(address cTokenAddress)
        internal
        view
        returns (address)
    {
        return CTokenInterface(cTokenAddress).underlying();
    }

    function _getUnderlyingPrice(address cTokenAddress)
        public
        view
        returns (uint256)
    {
        uint256 underlyingPrice = priceOracle.getUnderlyingPrice(cTokenAddress);

        return underlyingPrice;
    }

    function _getUnderlyingBalance(address cTokenAddress)
        internal
        returns (uint256)
    {
        CTokenInterface cTokenInstance = CTokenInterface(cTokenAddress);
        uint256 underlyingBalance =
            cTokenInstance.balanceOfUnderlying(address(this));

        return underlyingBalance;
    }

    function _getUnderlyingETHBalance() internal returns (uint256) {
        return cETH.balanceOfUnderlying(address(this));
    }
}
