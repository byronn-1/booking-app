import React, {useEffect, useState} from 'react';
import { Box, Flex, Text, VStack, Heading, Button, Divider, Select } from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SESSION_TEMPLATES } from '../_graphQL/querys/templateQueries';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, endOfWeek, addDays, format, addWeeks, subWeeks, getHours } from 'date-fns';
import { registerLocale } from "react-datepicker";
import enGb from 'date-fns/locale/en-GB';
registerLocale('en-GB', enGb);
import { CREATE_SEVEN_DAY_SESSION_TEMPLATE } from '../_graphQL/mutations/templateMutations';

// Inside your component
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Bookings = ({ sessions }) => {
  const { data, loading, error } = useQuery(GET_ALL_SESSION_TEMPLATES);
  const [createTemplate, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_SEVEN_DAY_SESSION_TEMPLATE);
  const [templates, setTemplates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [weekDays, setWeekDays] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateChange = (event) => {
    const selectedTemplateId = event.target.value;
    const foundTemplate = templates.find(template => template.id === selectedTemplateId);
    console.log(foundTemplate)
    setSelectedTemplate(foundTemplate);
  };
  

  useEffect(() => {
    setWeekDays(getWeekDays(selectedDate));
  }, [selectedDate]);
  

  // Function to render sessions for a specific day and time
  const renderSessions = (dayIndex, isMorning) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const targetDay = addDays(start, dayIndex);
  
    return sessions?.filter(session => {
      const sessionDate = new Date(session.time);
      const dayMatch = format(sessionDate, 'yyyy-MM-dd') === format(targetDay, 'yyyy-MM-dd');
      const hour = getHours(sessionDate);
      const isMorningSession = hour < 12;
      return dayMatch && isMorning === isMorningSession;
    }).map(session => (
      <Text key={session.id} fontSize="sm">
        {`${session.sessionType} - ${session.location}`}
      </Text>
    ));
  };

  const getWeekDays = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Customize weekStartsOn based on your locale
    return Array.from({ length: 7 }).map((_, index) => ({
      day: format(addDays(start, index), 'EEEE'), // Full name of the day
      date: format(addDays(start, index), 'd/M') // Format date as needed
    }));
  };

  const handlePrevWeek = () => {
    setSelectedDate(prevDate => subWeeks(prevDate, 1));
  };

  const handleNextWeek = () => {
    setSelectedDate(prevDate => addWeeks(prevDate, 1));
  };

  const handleApplyTemplate = async () => {
    if (!selectedTemplate) {
      console.log("No template selected");
      return;
    }
  
    const weekStartDate = format(startOfWeek(selectedDate), 'yyyy-MM-dd');
  
    const input = {
      templateName: selectedTemplate.templateName,
      coach: selectedTemplate.coach,
      sessionTemplates: selectedTemplate.sessionTemplates.map(session => ({
        sessionType: session.sessionType,
        location: session.location,
        dayOfTheWeek: session.dayOfTheWeek,
        time: session.time // Ensure the time format matches the backend expectation
      }))
    };
  
    try {
      await createTemplate({
        variables: {
          input: input,
          weekStartDate: weekStartDate
        }
      });
      console.log("Template applied successfully");
    } catch (error) {
      console.error("Error applying template", error);
    }
  };

  useEffect(() => {
    if (data) {
      setTemplates(data.getAllSevenDaySessionTemplates);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <VStack spacing={4} align="stretch">
      <Flex justify="space-between" p={2} bg="blue.200">
      <BackButton/>
      <Button size="xs">Location</Button>
      {selectedTemplate ? (
      <Heading size="sm">{selectedTemplate.coach} - {selectedTemplate.templateName}</Heading>
    ) : (
      <Heading size="sm">Select a Template</Heading>
    )}
        <Select w="110pxs" placeholder="Select template" onChange={handleTemplateChange}>
          {data?.getAllSevenDaySessionTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.templateName}
            </option>
          ))}
        </Select>
        <Button size="xs" onClick={handleApplyTemplate}>Apply Template</Button>
      </Flex>
      <Flex justify="space-between" align="center">
        <Button size="sm" w="120px" onClick={handlePrevWeek} mr="30px">&lt; Prev Week</Button>
        <DatePicker 
          selected={selectedDate} 
          onChange={(date) => setSelectedDate(date)} 
          dateFormat="dd-MM-yyyy" // Or any format you prefer
          locale="en-GB"
        />
        <Button size="sm"  w="120px" onClick={handleNextWeek}>Next Week &gt;</Button>
      </Flex>
      <Flex overflowX="scroll">
        {weekDays?.map(({day, date}, index) => (
          <VStack key={day} flex="1" border="1px" borderColor="gray.200">
            <Box bg="gray.100" w="100%">
              <Text fontWeight="bold">{day}</Text>
              <Text fontSize="xs">{date}</Text>
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
