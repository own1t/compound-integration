// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Compound.sol";

contract CompoundIntegration is Compound {
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }

    struct cToken {
        bytes32 cTokenTicker;
        address cTokenAddress;
        bytes32 underlyingTicker;
        address underlyingAddress;
        uint8 underlyingDecimals;
        bool collateral;
    }

    mapping(bytes32 => Token) public tokens;
    mapping(bytes32 => cToken) public cTokens;
    bytes32[] public tokenList;
    bytes32[] public cTokenList;

    address public owner;

    mapping(bytes32 => bool) public isCollateral;
    uint256 public collateralCount;

    constructor(
        address _comptroller,
        address _priceOracle,
        address _cETHAddress
    ) Compound(_comptroller, _priceOracle, _cETHAddress) {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    modifier ownCollateral() {
        require(collateralCount > 0, "must set collateral first");
        _;
    }

    function addToken(bytes32 ticker, address tokenAddress)
        external
        onlyOwner()
    {
        tokens[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    function addCToken(
        bytes32 cTokenTicker,
        address cTokenAddress,
        bytes32 underlyingTicker,
        uint8 underlyingDecimals
    ) external onlyOwner() {
        address underlyingAddress = CTokenInterface(cTokenAddress).underlying();

        cTokens[cTokenTicker] = cToken(
            cTokenTicker,
            cTokenAddress,
            underlyingTicker,
            underlyingAddress,
            underlyingDecimals,
            false
        );
        cTokenList.push(cTokenTicker);
    }

    function getTokens() external view returns (Token[] memory) {
        Token[] memory _tokens = new Token[](tokenList.length);
        for (uint256 i = 0; i < tokenList.length; i++) {
            _tokens[i] = Token(
                tokens[tokenList[i]].ticker,
                tokens[tokenList[i]].tokenAddress
            );
        }

        return _tokens;
    }

    function getCTokens() external view returns (cToken[] memory) {
        cToken[] memory _cTokens = new cToken[](cTokenList.length);
        for (uint256 i = 0; i < cTokenList.length; i++) {
            _cTokens[i] = cToken(
                cTokens[cTokenList[i]].cTokenTicker,
                cTokens[cTokenList[i]].cTokenAddress,
                cTokens[cTokenList[i]].underlyingTicker,
                cTokens[cTokenList[i]].underlyingAddress,
                cTokens[cTokenList[i]].underlyingDecimals,
                cTokens[cTokenList[i]].collateral
            );
        }

        return _cTokens;
    }

    function deposit(bytes32 ticker, uint256 amount) external {
        IERC20 tokenInstance = IERC20(tokens[ticker].tokenAddress);
        tokenInstance.transferFrom(msg.sender, address(this), amount);
    }

    function depositCToken(bytes32 cTokenTicker, uint256 amount) external {
        CTokenInterface cTokenInstance =
            CTokenInterface(cTokens[cTokenTicker].cTokenAddress);
        cTokenInstance.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(bytes32 ticker, uint256 amount) external onlyOwner() {
        IERC20 tokenInstance = IERC20(tokens[ticker].tokenAddress);
        uint256 balance = tokenInstance.balanceOf(address(this));
        require(balance >= amount, "not enough balance");

        tokenInstance.transfer(msg.sender, amount);
    }

    function withdrawCToken(bytes32 cTokenTicker, uint256 amount)
        external
        onlyOwner()
    {
        CTokenInterface cTokenInstance =
            CTokenInterface(cTokens[cTokenTicker].cTokenAddress);
        uint256 balance = cTokenInstance.balanceOf(address(this));
        require(balance >= amount, "not enough balance");

        cTokenInstance.transfer(msg.sender, amount);
    }

    function withdrawETH(uint256 amount) external onlyOwner() {
        require(address(this).balance >= amount, "not enough balance");

        address payable recipient = msg.sender;
        recipient.transfer(amount);
    }

    function supply(address cTokenAddress, uint256 underlyingAmount)
        external
        onlyOwner()
    {
        address underlyingAddress = _getUnderlyingAddress(cTokenAddress);
        IERC20 tokenInstance = IERC20(underlyingAddress);
        uint256 balance = tokenInstance.balanceOf(address(this));
        require(balance >= underlyingAmount, "not enough balance");

        _supply(cTokenAddress, underlyingAmount);
    }

    function supplyETH(uint256 underlyingAmount) external onlyOwner() {
        require(
            address(this).balance >= underlyingAmount,
            "not enough balance"
        );

        _supplyETH(underlyingAmount);
    }

    function redeem(address cTokenAddress, uint256 redeemAmount)
        external
        onlyOwner()
    {
        uint256 underlyingBalance = _getUnderlyingBalance(cTokenAddress);
        require(underlyingBalance >= redeemAmount, "not enough balance");

        _redeem(cTokenAddress, redeemAmount);
    }

    function redeemETH(uint256 redeemAmount) external onlyOwner() {
        uint256 underlyingBalance = _getUnderlyingETHBalance();
        require(underlyingBalance >= redeemAmount, "not enough balance");

        _redeemETH(redeemAmount);
    }

    function borrow(address cTokenAddress, uint256 borrowAmount)
        external
        onlyOwner()
        ownCollateral()
    {
        _borrow(cTokenAddress, borrowAmount);
    }

    function borrowETH(uint256 borrowAmount) external ownCollateral() {
        _borrowETH(borrowAmount);
    }

    function repayBorrow(address cTokenAddress, uint256 underlyingAmount)
        external
    {
        address underlyingAddress = _getUnderlyingAddress(cTokenAddress);
        IERC20 tokenInstance = IERC20(underlyingAddress);
        uint256 balance = tokenInstance.balanceOf(address(this));
        require(balance >= underlyingAmount, "not enough balance");

        _repayBorrow(cTokenAddress, underlyingAmount);
    }

    function repayBorrowETH(uint256 underlyingAmount) external {
        require(
            address(this).balance >= underlyingAmount,
            "not enough balance"
        );

        _repayBorrowETH(underlyingAmount);
    }

    function enterMarket(bytes32 cTokenTicker) external onlyOwner() {
        uint256 supplyBalance =
            _getSupplyBalance(cTokens[cTokenTicker].cTokenAddress);
        require(supplyBalance > 0, "not enough balance");

        _enterMarket(cTokens[cTokenTicker].cTokenAddress);

        cTokens[cTokenTicker].collateral = true;
        isCollateral[cTokenTicker] = true;
        collateralCount++;
    }

    function exitMarket(bytes32 cTokenTicker) external onlyOwner() {
        _exitMarket(cTokens[cTokenTicker].cTokenAddress);

        cTokens[cTokenTicker].collateral = false;
        isCollateral[cTokenTicker] = false;
        collateralCount--;
    }

    function claimComp() public onlyOwner() {
        _claimComp();
    }

    function withdrawComp(uint256 amount) external {
        uint256 compBalance = _getCompBalance();
        require(compBalance >= amount, "not enough balance");

        address compAddress = _getCompAddress();
        IERC20 compToken = IERC20(compAddress);
        compToken.transfer(msg.sender, amount);
    }

    function getCompBalance() external view returns (uint256) {
        return _getCompBalance();
    }

    function getMaxBorrow(bytes32 cTokenTicker)
        external
        view
        returns (uint256)
    {
        return _getMaxBorrow(cTokens[cTokenTicker].cTokenAddress);
    }

    function getBorrowLimit() external view returns (uint256) {
        return _getBorrowLimit();
    }

    function getSupplyBalance(bytes32 cTokenTicker)
        external
        view
        returns (uint256)
    {
        return _getSupplyBalance(cTokens[cTokenTicker].cTokenAddress);
    }

    function getBorrowBalance(bytes32 cTokenTicker) external returns (uint256) {
        return _getBorrowBalance(cTokens[cTokenTicker].cTokenAddress);
    }

    function getExchangeRate(bytes32 cTokenTicker) external returns (uint256) {
        return _getExchangeRate(cTokens[cTokenTicker].cTokenAddress);
    }

    function getUnderlyingPrice(bytes32 cTokenTicker)
        external
        view
        returns (uint256)
    {
        return _getUnderlyingPrice(cTokens[cTokenTicker].cTokenAddress);
    }

    function getUnderlyingBalance(bytes32 cTokenTicker)
        external
        returns (uint256)
    {
        return _getUnderlyingBalance(cTokens[cTokenTicker].cTokenAddress);
    }

    receive() external payable {}
}
