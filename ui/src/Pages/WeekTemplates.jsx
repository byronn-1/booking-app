import React, { useEffect } from 'react';
import {
  Box, Flex, Heading, Button, Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';
import { GET_ALL_SESSION_TEMPLATES } from '../_graphQL/querys/templateQueries';
import { useQuery } from '@apollo/client';

const WeekTemplates = () => {
  const { data, loading, error } = useQuery(GET_ALL_SESSION_TEMPLATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  useEffect(() => {
    console.log(data)
  },[data])
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
        {data?.getAllSevenDaySessionTemplates?.map(template => (
            <Tr key={template.id}>
              <Td>{template.templateName}</Td> {/* Assuming sessionType is similar to templateName */}
              <Td>{template.time}</Td> {/* Format the date as required */}
              <Td isNumeric>{template.sessionTemplates.length }</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WeekTemplates;
