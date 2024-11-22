import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const getBalance = async (address: string) => {
  const response = await axios.get(`${API_URL}/users/balance/${address}`);
  return response.data;
};

export const buyEnergy = async (address: string, amount: string) => {
  const response = await axios.post(`${API_URL}/energy/buy`, { address, amount });
  return response.data;
};

export const sellEnergy = async (address: string, amount: string) => {
  const response = await axios.post(`${API_URL}/energy/sell`, { address, amount });
  return response.data;
};

export const registerProducer = async (address: string) => {
  const response = await axios.post(`${API_URL}/users/register-producer`, { address });
  return response.data;
};

export const unregisterProducer = async (address: string) => {
  const response = await axios.post(`${API_URL}/users/unregister-producer`, { address });
  return response.data;
};
