import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
import { getBalance } from '../services/api';

export default function Dashboard() {
  const { account } = useWeb3();
  const [balance, setBalance] = useState({ energyBalance: '0', accountBalance: '0', isProducer: false });

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  const fetchBalance = async () => {
    try {
      const data = await getBalance(account);
      setBalance(data);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <Box maxWidth="container.md" margin="auto" mt={8}>
      <Heading mb={6}>Dashboard</Heading>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Energy Balance:</Text>
          <Text>{balance.energyBalance} units</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Account Balance:</Text>
          <Text>{balance.accountBalance} ETH</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Producer Status:</Text>
          <Text>{balance.isProducer ? 'Registered' : 'Not Registered'}</Text>
        </HStack>
        <Button colorScheme="teal" onClick={fetchBalance}>
          Refresh Balance
        </Button>
      </VStack>
    </Box>
  );
}
