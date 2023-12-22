import React from 'react';
import {
  Box, Flex, Heading, Button, Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';

const WeekTemplates = ({ weekTemplates }) => {
  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <BackButton/>
        <Heading size="md">Week Templates</Heading>
        <Button size="sm">Create New Template</Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Template Name</Th>
            <Th>Last Edited</Th>
            <Th isNumeric>Number of Sessions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {weekTemplates?.map(template => (
            <Tr key={template.id}>
              <Td>{template.templateName}</Td>
              <Td>{template.lastEdited}</Td>
              <Td isNumeric>{template.numberOfSessions}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WeekTemplates;
