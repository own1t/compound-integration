// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

interface CETHInterface {
    function mint() external payable;

    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);

    function borrow(uint256 borrowAmount) external returns (uint256);

    function repayBorrow() external payable;

    function balanceOfUnderlying(address owner) external returns (uint256);
}
