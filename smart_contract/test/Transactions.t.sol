// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Transactions.sol";

contract TransactionsTest is Test {
    Transactions public transactions;

    event Transfer(address from, address to, uint256 amount, string message, uint256 timestamp, string keyword);

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    function setUp() public {
        transactions = new Transactions();
    }

    function testAddToBlockchain() public {
        address payable receiver = payable(0x2c35b28f8B717Bf5F768b99EF26ba0AEEf8d3714);
        uint256 amount = 4e16;
        string memory message = "message";
        string memory keyword = "keyword";

        uint256 warpedTime = 1655555555;

        // emit Transfer(msg.sender, receiver, amount, message, warpedTime, keyword);
        vm.warp(warpedTime);
        transactions.addToBlockchain(receiver, amount, message, keyword);

        assertEq(transactions.transactionCount(), 1);

        assertEq(transactions.getAllTransactions().length, 1);
        assertEq(abi.encode(transactions.getAllTransactions()[0]), abi.encode(Transaction(address(this), address(0x2c35b28f8B717Bf5F768b99EF26ba0AEEf8d3714), amount, message, warpedTime, keyword)));
    }

    function testEmitEventOnAddToBlockchain() public {
        address payable receiver = payable(0x2c35b28f8B717Bf5F768b99EF26ba0AEEf8d3714);
        uint256 amount = 4e16;
        string memory message = "message";
        string memory keyword = "keyword";

        uint256 warpedTime = 1655555555;

        vm.expectEmit(address(transactions));
        emit Transfer(address(this), receiver, amount, message, warpedTime, keyword);

        vm.warp(warpedTime);
        transactions.addToBlockchain(receiver, amount, message, keyword);
    }
}