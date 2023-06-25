// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Transactions {
    uint256 public transactionCount;

    event Transfer(address from, address to, uint256 amount, string message, uint256 timestamp, string keyword);

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    Transaction[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string calldata message, string calldata keyword) public {
        transactionCount += 1;
        transactions.push(Transaction(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
}