import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Profile from './pages/Profile';
import { Web3Provider } from './context/Web3Context';

export default function App() {
  return (
    <ChakraProvider>
      <Web3Provider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market" element={<Market />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Web3Provider>
    </ChakraProvider>
  );
}
