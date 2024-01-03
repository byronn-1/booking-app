import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {

    const navigate = useNavigate();

  return (
    <Flex direction={["row","column"]} alignItems="center">
      <Button w="180px" onClick={() => navigate('/bookings')}>Bookings</Button>
      <Button w="180px" onClick={() => navigate('/add-student')}>Add Student</Button>
      <Button w="180px" onClick={() => navigate('/create-session')}>Create Session</Button>
      <Button w="180px" onClick={() => navigate('/week-templates')}>Week Templates</Button>
      <Button w="180px" onClick={() => navigate('/create-week-template')}>Create Week Template</Button>

    </Flex>
  )
}

export default FrontPage