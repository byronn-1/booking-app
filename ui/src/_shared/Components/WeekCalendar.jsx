import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeekCalendar = ({ renderContent }) => {
  return (
    <Flex overflowX="scroll">
      {daysOfWeek.map((day, index) => (
        <VStack key={day} flex="1" border="1px" borderColor="gray.200">
          <Box bg="gray.100" p={2}>
            <Text fontWeight="bold">{day}</Text>
            <Text fontSize="xs">Date</Text>
          </Box>
          {renderContent(day, index)}
        </VStack>
      ))}
    </Flex>
  );
};

export default WeekCalendar;
