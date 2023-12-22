import React from 'react';
import { Box, Flex, Heading, Button, VStack, Text } from '@chakra-ui/react';
import WeekCalendar from '../_shared/Components/WeekCalendar';
import BackButton from '../_shared/Components/Buttons/BackButton';

const CreateWeekSessionsTemplate = ({ coachName, templateName }) => {
  // Function to render content for each day
  const renderDayContent = (day, index) => {
    // Here you can add functionality to handle session templates
    return (
      <VStack flex="1" p={2}>
        <Text>Content for {day}</Text>
        {/* Add more interactive elements here */}
      </VStack>
    );
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
      <BackButton/>
        <Heading size="md">{coachName} - {templateName}</Heading>
        <Button size="sm">Save</Button>
      </Flex>
      <WeekCalendar renderContent={renderDayContent} />
    </Box>
  );
};

export default CreateWeekSessionsTemplate;
