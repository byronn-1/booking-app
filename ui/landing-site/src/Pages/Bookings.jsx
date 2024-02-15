import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, VStack, Heading, Button, Divider, Select } from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, endOfWeek, addDays, format, addWeeks, subWeeks, getHours } from 'date-fns';
import { registerLocale } from "react-datepicker";
import enGb from 'date-fns/locale/en-GB';

registerLocale('en-GB', enGb);

import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_SESSION_TEMPLATES } from '../_graphQL/querys/templateQueries';
import { CREATE_SESSIONS_FROM_TEMPLATE_MUTATION } from '../_graphQL/mutations/sessionMutations';
import { GET_ALL_SESSIONS } from '../_graphQL/querys/sessionQueries';
import { useSelector } from 'react-redux';


const Bookings = () => {
  const isOwner = useSelector((state) => state.auth.isOwner);
  const clubId = useSelector((state) => state.auth.clubId);
  const ownerId = useSelector((state) => state.auth.ownerId);
  const token = useSelector((state) => state.auth.token);

  const { data, loading, error, refetch } = useQuery(GET_ALL_SESSION_TEMPLATES);
  const { data: sessionsData, loading: sessionsLoading, error: sessionsError } = useQuery(GET_ALL_SESSIONS);

  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  const [localSessions, setLocalSessions] = useState([]);
  const [applySessionsMutation, { loading: applyingSessions, error: applySessionsError }] = useMutation(CREATE_SESSIONS_FROM_TEMPLATE_MUTATION);

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

  // Function to render sessions for a specific day and time
  const renderSessions = (dayIndex, isMorning) => {

    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });

    const targetDay = addDays(start, dayIndex - 1);
    return localSessions?.filter(session => {
      if (!session.time || isNaN(new Date(session.time).getTime())) {
        console.error('Invalid session time:', session.time);
        return false;
      }

      const sessionDate = new Date(session.time);

      let sessionDayOfWeek = sessionDate.getDay();
      sessionDayOfWeek = sessionDayOfWeek === 0 ? 7 : sessionDayOfWeek; // Convert Sunday from 0 to 7

      const dayMatch = format(sessionDate, 'yyyy-MM-dd') === format(targetDay, 'yyyy-MM-dd')
      const hour = sessionDate.getHours()
      const isMorningSession = hour < 12;

      return dayMatch && isMorning === isMorningSession;
    }).map(session => {
      const sessionTime = format(new Date(session.time), 'HH:mm');
      return (
        <Text key={session.id} fontSize="sm">
          {`${sessionTime} : ${session.sessionType} - ${session.location}`}
        </Text>
      )
    });
  };

  const getWeekDays = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Customize weekStartsOn based on your local

    return Array.from({ length: 7 }).map((_, index) => ({
      day: format(addDays(start, index), 'E'), // Full name of the day
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

    try {
      const response = await applySessionsMutation({
        variables: {
          templateId: selectedTemplate.id,
          weekStartDate: weekStartDate
        }
      });
      console.log("Sessions applied successfully", response.data.createSessionsFromId);
      await refetch();
      // Merge new sessions with existing ones
      const newSessions = response.data.createSessionsFromId;
      const mergedSessions = [...localSessions, ...newSessions];

      // Remove duplicates if necessary
      const uniqueSessions = mergedSessions.reduce((unique, session) => {
        return unique.some(s => s.id === session.id) ? unique : [...unique, session];
      }, []);

      setLocalSessions(uniqueSessions);
    } catch (error) {
      console.error("Error applying sessions from template", error);
    }
  };

  //Should prevent a template being applied to a week multiple times needs alteration since I doubt the Id's will work in this way
  const isTemplateApplied = () => {
    if (!selectedTemplate || !localSessions) return false;

    const templateSessionIds = new Set(selectedTemplate.sessionTemplates.map(s => s.id));
    return localSessions.some(session => templateSessionIds.has(session.id));
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setWeekDays(getWeekDays(selectedDate));

    // Filter sessions for the selected week
    if (sessionsData) {
      const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const endOfWeekDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

      const filteredSessions = sessionsData.allSessions.filter(session => {
        const sessionDate = new Date(session.time);
        return sessionDate >= startOfWeekDate && sessionDate <= endOfWeekDate;
      });

      filteredSessions.sort((a, b) => new Date(a.time) - new Date(b.time));

      setLocalSessions(filteredSessions);
    }
  }, [selectedDate, sessionsData]);

  useEffect(() => {
    if (data) {
      setTemplates(data.getAllSevenDaySessionTemplates);
    }
  }, [data]);

  //Check the screen orientation, if the user is viewing the page portrait then set isPortrait accordingly
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight || window.innerWidth < 800);
    };
    // Call handleResize initially to set the correct state based on the current viewport size
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log(clubId);
  }, [clubId])

  if (isPortrait) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%', fontSize: '20px' }}>
        Please rotate your device to landscape mode.
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction='column' alignItems='center' h='calc(100vh)' w='calc(100vw)'>
      <Flex justify="space-between" w="100%" p={2} bg="blue.200">
        <BackButton />
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
        <Button size="xs" onClick={handleApplyTemplate} disabled={isTemplateApplied()}>Apply Template</Button>
      </Flex>
      <Flex justify="space-between" w="70%" align="center">
        <Button size="sm" w="120px" onClick={handlePrevWeek} mr="30px">&lt; Prev Week</Button>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd-MM-yyyy" // Or any format you prefer
          locale="en-GB"
        />
        <Button size="sm" w="120px" onClick={handleNextWeek}>Next Week &gt;</Button>
      </Flex>
      <Flex direction='row' flex='1' overflowX="scroll" w="99%">
        {weekDays?.map(({ day, date }, index) => (
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
    </Flex>
  );
};

export default Bookings;
