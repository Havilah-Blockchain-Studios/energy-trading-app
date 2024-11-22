import React from 'react';
import { Box, Flex, Link, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';

export default function Navbar() {
  const { account, connectWallet } = useWeb3();

  return (
    <Box bg="gray.800" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" fontWeight="bold" color="white">
            Energy Trading
          </Link>
        </Flex>

        <Flex alignItems="center">
          <Link as={RouterLink} to="/" mr={4} color="white">
            Dashboard
          </Link>
          <Link as={RouterLink} to="/market" mr={4} color="white">
            Market
          </Link>
          <Link as={RouterLink} to="/profile" mr={4} color="white">
            Profile
          </Link>
          {account ? (
            <Button colorScheme="teal" size="sm">
              {`${account.slice(0, 6)}...${account.slice(-4)}`}
            </Button>
          ) : (
            <Button colorScheme="teal" size="sm" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
