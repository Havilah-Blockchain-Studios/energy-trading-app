import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Web3 from 'web3';
import contractABI from './contractABI.json';
import userRoutes from './routes/userRoutes.js';
import energyRoutes from './routes/energyRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3(process.env.ETHEREUM_NODE_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use((req, res, next) => {
  req.web3 = web3;
  req.contract = contract;
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/energy', energyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
