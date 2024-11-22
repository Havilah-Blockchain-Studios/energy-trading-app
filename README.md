# Energy Trading App

This is a full-stack decentralized application for energy trading using blockchain technology.

## Setup and Installation

1. Clone the repository: 
   
   git clone [https://github.com/Havilah-Blockchain-Studios/energy-trading-app.git](https://github.com/Havilah-Blockchain-Studios/energy-trading-app.git)
   cd energy-trading-app

2. Create a `.env` file in the root directory with the following content:

   # Ethereum
   ETHEREUM_NODE_URL=[https://goerli.infura.io/v3/YOUR-PROJECT-ID](https://goerli.infura.io/v3/YOUR-PROJECT-ID)
   PRIVATE_KEY=your-metamask-private-key

   # Backend
   PORT=3001
   CONTRACT_ADDRESS=

   # Frontend
   REACT_APP_API_URL=[http://localhost:3001/api](http://localhost:3001/api)


3. Install dependencies:
   npm run install

4. Deploy the smart contract:
   npm run deploy

5. Start the application:
   npm start


## Deploying Smart Contracts

1. Navigate to the `smart-contracts` directory:
   cd smart-contracts


2. Compile the contracts:
   npx hardhat compile


3. Deploy to the Goerli testnet:
   npx hardhat run scripts/deploy.js --network goerli


## Features

- Buy and sell energy
- Register and unregister as an energy producer
- View energy and account balances
- Web3 integration for blockchain interactions

## Technologies Used

- Solidity for smart contracts
- Node.js and Express for the backend
- React for the frontend
- Web3.js for blockchain interactions
- Chakra UI for styling

## Future Improvements

- Real-time energy consumption tracking
- Integration with IoT devices
- Advanced market mechanisms (auctions, futures contracts)
- Data visualization and analytics dashboard
- Multi-currency support
- Integration with external energy data providers

License
This project is licensed under the Educational Use License (Based on MIT License).
It is provided strictly for educational and research purposes.

For any non-educational or commercial use, you must contact kingfavourjudah@gmail.com to obtain permission.