import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Flex direction={["column", "column"]} alignItems="center" mt="40px">
      <FormControl>
        <FormLabel htmlFor='search_clubs'>Search Clubs</FormLabel>
        <Input id='search_clubs' />
      </FormControl>
      <Button w="200px" mt="25px" onClick={() => navigate('/login')}>Login</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/sign-up-as-owner')}>Sign Up</Button>
    </Flex>
  )
}

export default LandingPage