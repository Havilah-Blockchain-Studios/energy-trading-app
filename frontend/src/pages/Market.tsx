import React, { useState } from 'react';
import { Box, Heading, VStack, HStack, Input, Button, useToast } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
import { buyEnergy, sellEnergy } from '../services/api';

export default function Market() {
  const { account } = useWeb3();
  const [amount, setAmount] = useState('');
  const toast = useToast();

  const handleBuy = async () => {
    try {
      await buyEnergy(account, amount);
      toast({
        title: 'Energy Purchased',
        description: `Successfully bought ${amount} units of energy.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to purchase energy.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSell = async () => {
    try {
      await sellEnergy(account, amount);
      toast({
        title: 'Energy Sold',
        description: `Successfully sold ${amount} units of energy.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sell energy.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="container.md" margin="auto" mt={8}>
      <Heading mb={6}>Energy Market</Heading>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Enter amount of energy"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
        />
        <HStack>
          <Button colorScheme="green" onClick={handleBuy} flex={1}>
            Buy Energy
          </Button>
          <Button colorScheme="blue" onClick={handleSell} flex={1}>
            Sell Energy
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
