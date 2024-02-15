import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {

  const navigate = useNavigate();

  return (
    <Flex direction={["column", "column"]} alignItems="center" mt="40px">
      <Button variant='whiteBg' w="200px" mt="25px" onClick={() => navigate('/bookings')}>Bookings</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/add-coach')}>Add Coach</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/create-session')}>Create Session</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/week-templates')}>Week Templates</Button>
      <Button w="200px" mt="25px" onClick={() => navigate('/create-week-template')}>Create Week Template</Button>
    </Flex>
  )
}

export default FrontPage