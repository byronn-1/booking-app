import React from 'react';
import { Box, Flex, Text, VStack, Heading, Button, Divider } from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Bookings = ({ sessions }) => {
  // Function to render sessions for a specific day and time
  const renderSessions = (day, isMorning) => {
    return sessions?.filter(session => {
      const dayMatch = new Date(session.time).getDay() === day;
      const hour = new Date(session.time).getHours();
      const isMorningSession = hour < 12;
      return dayMatch && isMorning === isMorningSession;
    }).map(session => (
      <Text key={session.id} fontSize="sm">
        {`${session.sessionType} - ${session.location}`}
      </Text>
    ));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" p={2} bg="blue.200">
      <BackButton/>
        <Heading size="sm">Coach Name - Month/Year</Heading>
        <Button size="xs">Location</Button>
        <Button size="xs">Add Template</Button>
        <Button size="xs">Save</Button>
      </Flex>
      <Flex overflowX="scroll">
        {daysOfWeek?.map((day, index) => (
          <VStack key={day} flex="1" border="1px" borderColor="gray.200">
            <Box bg="gray.100" p={2}>
              <Text fontWeight="bold">{day}</Text>
              <Text fontSize="xs">Date</Text>
            </Box>
            <VStack flex="1" p={2}>
              <Box flex="1">
                {renderSessions(index + 1, true)}
              </Box>
              <Divider borderColor="gray.400" />
              <Box flex="1">
                {renderSessions(index + 1, false)}
              </Box>
            </VStack>
          </VStack>
        ))}
      </Flex>
    </VStack>
  );
};

export default Bookings;
