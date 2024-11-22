import React from 'react';
import { Box, Heading, VStack, Button, useToast } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
import { registerProducer, unregisterProducer } from '../services/api';

export default function Profile() {
  const { account } = useWeb3();
  const toast = useToast();

  const handleRegisterProducer = async () => {
    try {
      await registerProducer(account);
      toast({
        title: 'Producer Registered',
        description: 'You have successfully registered as a producer.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register as a producer.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUnregisterProducer = async () => {
    try {
      await unregisterProducer(account);
      toast({
        title: 'Producer Unregistered',
        description: 'You have successfully unregistered as a producer.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to unregister as a producer.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="container.md" margin="auto" mt={8}>
      <Heading mb={6}>Profile</Heading>
      <VStack spacing={4} align="stretch">
        <Button colorScheme="green" onClick={handleRegisterProducer}>
          Register as Producer
        </Button>
        <Button colorScheme="red" onClick={handleUnregisterProducer}>
          Unregister as Producer
        </Button>
      </VStack>
    </Box>
  );
}
