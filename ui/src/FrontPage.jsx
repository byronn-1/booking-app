import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {

    const navigate = useNavigate();

  return (
    <Flex direction={["row","column"]}>
      <Button onClick={() => navigate('/bookings')}>Bookings</Button>
      <Button onClick={() => navigate('/add-student')}>Add Student</Button>
      <Button onClick={() => navigate('/create-session')}>Create Session</Button>
      <Button onClick={() => navigate('/week-templates')}>Week Templates</Button>
      <Button onClick={() => navigate('/create-week-template')}>Create Week Template</Button>

    </Flex>
  )
}

export default FrontPage