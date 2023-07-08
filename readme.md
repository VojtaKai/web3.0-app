# Project description
App allows users to send ETH via a user friendly form, log this transaction to the Ethereum blockchain and show the latest logged transactions.
It makes use of the Metamask browser extension. Transaction information is entered to a form in the page. User has to acknowledge them in the Metamask.
Successful transaction are then logged to the to the page and enhanced with a gif that relates to the keyword entered to the form as part of the transaction details.

# Start locally
cd ./client && npm run dev
open a browser, go to localhost:port - you will see the port in the console

# Technologies
- ReactJS
- Typescript
- Vite (build tool)
- NPM (package manager)
- Tailwind (css)
- Solidity
- Foundry
- Ethereum blockchain
- Etherscan
- Alchemy (RPC Node)

# DOTENV
To get actual gifs from giphy, it is necessary to setup your own API KEY.

# Requirements
- Metamask wallet
- API KEY to GIPHY

# Tips how to deploy your own smart contract
- write a deployment script name.s.sol
- create .env file and add:
    RPC_URL - url to an RPC node, I used alchemy (alchemy.com) where I created an app and for this app, you select the chain and the network (e.g. chain: ethereum, network: Sepolia) and you get a specific url. This url leads to an RPC node that is able to communicate with the specific network of the Ethereum blockchain.
    PRIVATE_KEY - the private key of your metamask wallet - you can find it in Metamask
    ETHERSCAN_API_KEY - optional, you would need to create an account at Etherscan and then have an api key created there
- expose the environment variables: source .env
- execute deployment script:
forge script script/Transaction.s.sol:TransactionsDeployment --rpc-url $RPC_URL --broadcast (--verify) -vvvv

