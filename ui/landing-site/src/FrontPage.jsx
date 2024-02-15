import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {

  const navigate = useNavigate();

  return (
    <Flex direction={["column", "column"]} alignItems="center" mt="40px">
      <Button w="200px" mt="25px" onClick={() => navigate('/bookings')}>Bookings</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/search-clubs')}>Clubs</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/settings')}>Settings</Button>
    </Flex>
  )
}

export default FrontPage