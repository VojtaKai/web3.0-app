pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { Transactions } from "../src/Transactions.sol";


// # To load the variables in the .env file
// source .env

// # To deploy and verify our contract
// forge script script/NFT.s.sol:MyScript --rpc-url $GOERLI_RPC_URL --broadcast --verify -vvvv
// forge script script/Transaction.s.sol:TransactionsDeployment --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv


contract TransactionsDeployment is Script {
    function setUp() public {}

    event Deployed(address transactionScript);

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.broadcast(deployerPrivateKey);
        Transactions transactions = new Transactions();

        emit Deployed(address(transactions));
    }
}