import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Flex, Text, Heading, Button, Divider, Select } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, endOfWeek, addDays, format, addWeeks, subWeeks, addMinutes, parseISO } from 'date-fns';
import { registerLocale } from "react-datepicker";
import enGb from 'date-fns/locale/en-GB';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { GET_SESSIONS_FROM_CLUB_ID } from '../_graphQL/querys/sessionQueries';
import { CREATE_SESSIONS_FROM_CLUB_ID_WITH_TEMPLATE_ID } from '../_graphQL/mutations/sessionMutations';
import { GET_ALL_SESSION_TEMPLATES } from '../_graphQL/querys/templateQueries';

registerLocale('en-GB', enGb);

const Bookings = () => {
  const navigate = useNavigate();

  const clubId = useSelector((state) => state.auth.clubId);

  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);
  const [localSessions, setLocalSessions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  const [weekDates, setWeekDates] = useState([]);
  const [sessions, setSessions] = useState();
  //Queries
  const { data: templateData, loading: templateLoading, error: templateError, refetch: refetchTemplates } = useQuery(GET_ALL_SESSION_TEMPLATES);
  const { loading: sessionsLoading, error: sessionsError, data: sessionsData, refetch: refetchSessions } = useQuery(GET_SESSIONS_FROM_CLUB_ID,
    {
      variables: { clubId }
      ,
      fetchPolicy: "cache-and-network",
    });
  //Mutation
  const [applySessionsMutation, { loading: applyingSessions, error: applySessionsError }] = useMutation(CREATE_SESSIONS_FROM_CLUB_ID_WITH_TEMPLATE_ID,
    {
      onCompleted: () => refetchSessions(),
    });


  //set the scroll position to 7:00 am 
  const scrollContainerRef = useRef(null);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleTemplateChange = (event) => {
    const templateId = event.target.value;
    const foundTemplate = templates.find(t => t.id === templateId);
    if (foundTemplate) {
      setSelectedTemplate(foundTemplate);
    } else {
      // Handle case where template is not found
      setSelectedTemplate(null); // or set to an appropriate default state
    }

    /*  const selectedTemplateId = event.target.value;
     const foundTemplate = templates.find(template => template.id === selectedTemplateId);
     console.log(foundTemplate)
     setSelectedTemplate(foundTemplate);
     setLocalSessions(foundTemplate.sessions); */
  };


  const handleApplyTemplate = async () => {
    if (!selectedTemplate) {
      console.log("No template selected");
      return;
    }

    await applySessionsMutation({
      variables: {
        templateId: selectedTemplate.id,
        weekStartDate: format(startOfWeek(selectedDate), 'yyyy-MM-dd'),
        clubId: clubId,
      },
    }).then(() => {
      refetchSessions();
      setSelectedTemplate(null);
    }).catch((error) => {
      console.error("Error applying sessions from template", error);
    });
    /*    if (!selectedTemplate) {
         console.log("No template selected");
         return;
       }
   
       const weekStartDate = format(startOfWeek(selectedDate), 'yyyy-MM-dd');
   
       try {
   
         console.log({
           templateId: selectedTemplate.id,
           weekStartDate: weekStartDate,
           clubId: clubId
         })
         const response = await applySessionsMutation({
           variables: {
             templateId: selectedTemplate.id,
             weekStartDate: weekStartDate,
             clubId: clubId
           }
         });
         console.log("Sessions applied successfully", response.data.createSessionsWithClubIdFromTemplateId);
         await refetch();
         // Merge new sessions with existing ones
         const newSessions = response.data.createSessionsWithClubIdFromTemplateId;
         const mergedSessions = [...localSessions, ...newSessions];
   
         // Remove duplicates if necessary
         const uniqueSessions = mergedSessions.reduce((unique, session) => {
           return unique.some(s => s.id === session.id) ? unique : [...unique, session];
         }, []);
   
         setLocalSessions(uniqueSessions);
       } catch (error) {
         console.error("Error applying sessions from template", error);
       } */
  };

  //Should prevent a template being applied to a week multiple times needs alteration since I doubt the Id's will work in this way
  const isTemplateApplied = () => {
    if (!selectedTemplate || !localSessions) return false;

    const templateSessionIds = new Set(selectedTemplate?.sessionTemplates?.map(s => s.id));
    return localSessions.some(session => templateSessionIds.has(session.id));
  };

  function renderSessionsForDay(sessionsData, date) {
    /*     const formattedDate = format(date, 'yyyy-MM-dd');
        return sessionsData?.getSessionsWithClubId.filter(session => format(parseISO(session.time), 'yyyy-MM-dd') === formattedDate).map((session, index) => (
          <Box key={index} position="absolute">
            <Text fontSize="xs"> {session.sessionType}</Text>
          </Box>
        )); */
    // Format the date for comparison
    const formattedDate = format(date, 'yyyy-MM-dd');

    const filteredSessions = sessionsData.getSessionsWithClubId.filter(session => {
      const sessionDate = format(parseISO(session.time), 'yyyy-MM-dd');
      return sessionDate === formattedDate;
    });

    const filteredSessionsMapped = filteredSessions?.map((session, index) => {
      const sessionDate = parseISO(session.time);
      const sessionStartHour = sessionDate.getHours();
      const sessionStartMinute = sessionDate.getMinutes();
      const sessionTop = (sessionStartHour * 60) + sessionStartMinute; // Convert start time to pixels

      return (
        <Box key={index} position="absolute" top={`${sessionTop}px`} left="0" height={`${session.duration}px`} width="full" style={{ backgroundColor: 'rgba(50, 0, 125, 0.09)' }} borderRadius='3px' zIndex="1" textAlign="center">
          <Text fontSize="xs">{`${format(sessionDate, 'HH:mm')} - ${format(addMinutes(sessionDate, session.duration), 'HH:mm')}`}: {session.sessionType}</Text>
        </Box>
      );
    });
    return filteredSessionsMapped
  }

  //render sessions from the selected template
  /*   const renderTemplateSessionsForDay = (selectedDate, dayIndex) => {
      // Ensure the selected template and its sessions are available
      if (!selectedTemplate || !selectedTemplate.sessionTemplates) return null;
  
      // Calculate the date for the given dayIndex relative to the selectedDate
      const dateOfRenderedDay = addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), dayIndex);
      const formattedDateOfRenderedDay = format(dateOfRenderedDay, 'yyyy-MM-dd');
  
      return selectedTemplate.sessionTemplates
        .filter(session => {
          // Parse session time and compare with the dayIndex
          const sessionDate = parseISO(session.time);
          return getDay(sessionDate) === dayIndex + 1; // Adjust based on your week start (getDay: 0 = Sunday, 1 = Monday, etc.)
        })
        .map((session, index) => {
          // Format the session time for display
          const sessionStartTime = format(parseISO(session.time), 'HH:mm');
          const sessionEndTime = format(addMinutes(parseISO(session.time), session.duration), 'HH:mm');
  
          // Render the session block
          return (
            <Box key={index} p={2} bg="lightblue" color="black" m={2}>
              <Text fontSize="sm">{`${session.sessionType} at ${session.location}`}</Text>
              <Text fontSize="xs">{`Time: ${sessionStartTime} - ${sessionEndTime}`}</Text>
            </Box>
          );
        });
    }; */
  const renderTemplateSessionsForDay = (dayIndex) => {
    // Ensure the selected template and its sessions are available
    if (!selectedTemplate || !selectedTemplate.sessionTemplates) return null;

    // Filter sessions for the specific day of the week
    const sessionsForDay = selectedTemplate.sessionTemplates.filter(session => session.dayOfTheWeek === dayIndex + 1); // Adjust if your week starts on Sunday

    // Map over the sessions for the day and render
    const sessionsMapped = sessionsForDay.map((session, index) => {
      // Assume you have logic to calculate the position based on session.time
      const startTime = format(parseISO(session.time), 'HH:mm');
      const endTime = format(addMinutes(parseISO(session.time), session.duration), 'HH:mm');
      const sessionDate = parseISO(session.time);
      const sessionStartHour = sessionDate.getHours();
      const sessionStartMinute = sessionDate.getMinutes();
      const sessionTop = (sessionStartHour * 60) + sessionStartMinute;
      return (
        <Box key={index} style={{ position: 'absolute', top: `${sessionTop}px`, height: `${session.duration}px`, left: '0', width: '100%', borderRadius: '4px', backgroundColor: 'rgba(255, 8, 0, 0.1)' }}>
          <Text fontSize='xs' >{`${session.sessionType} (${startTime} - ${endTime})`}</Text>
        </Box>
      );
    });
    return sessionsMapped;
  };


  //Get the week days for selected date from calendar picker(whether that be a mid week day)
  const getWeekDays = (selectedDate) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Customize weekStartsOn based on your local

    return Array.from({ length: 7 }).map((_, index) => ({
      day: format(addDays(start, index), 'E'), // Full name of the day
      date: format(addDays(start, index), 'd/M') // Format date as needed
    }));
  };

  // render prev week
  const handlePrevWeek = () => {
    setSelectedDate(prevDate => subWeeks(prevDate, 1));
  };
  // render next week
  const handleNextWeek = () => {
    setSelectedDate(prevDate => addWeeks(prevDate, 1));
  };

  /*   useEffect(() => {
      refetch();
    }, [refetch]); */

  //Filter sessions for the rendered/selected week
  useEffect(() => {
    setWeekDays(getWeekDays(selectedDate));

    // Filter sessions for the selected week
    if (sessionsData) {
      const startOfWeekDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const endOfWeekDate = endOfWeek(selectedDate, { weekStartsOn: 1 });

      const filteredSessions = sessionsData.getSessionsWithClubId.filter(session => {
        const sessionDate = new Date(session.time);
        return sessionDate >= startOfWeekDate && sessionDate <= endOfWeekDate;
      });

      filteredSessions.sort((a, b) => new Date(a.time) - new Date(b.time));

      setLocalSessions(filteredSessions);
    }
  }, [selectedDate, sessionsData]);
  /* 
    useEffect(() => {
      if (data) {
        setTemplates(data.getAllSevenDaySessionTemplates);
      }
    }, [data]); */

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

  // Set the dates for the calendar
  useEffect(() => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
    const dates = Array.from({ length: 7 }).map((_, index) => addDays(start, index));
    setWeekDates(dates);
  }, [selectedDate]);

  //Render calendar at 7:00 am
  useLayoutEffect(() => {
    if (scrollContainerRef.current && weekDates.length > 0) {
      const initialScrollTop = 7 * 60; // 7 hours * 60 pixels per hour
      scrollContainerRef.current.scrollTop = initialScrollTop;
    }
  }, [weekDates]);

  useEffect(() => {
    if (templateData && templateData.getAllSevenDaySessionTemplates) {
      setTemplates(templateData.getAllSevenDaySessionTemplates);
    }
  }, [templateData]);

  useEffect(() => {
    if (sessionsData && sessionsData.getSessionsWithClubId) {
      setSessions(sessionsData.getSessionsWithClubId);
    }
  }, [sessionsData]);

  useEffect(() => {
    refetchSessions();
  }, [selectedDate, refetchSessions]);

  useEffect(() => {
    console.log('selectedTemplate', selectedTemplate)
    console.log(templateData, templates);
  }, [templateData, templates, selectedTemplate])

  /*   useEffect(() => {
      console.log('sessionsData', sessionsData)
      console.log('sessions', sessions)
  
    }, [sessionsData]) */
  if (isPortrait) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%', fontSize: '20px' }}>
        Please rotate your device to landscape mode.
      </div>
    );
  }

  if (!sessionsData || !sessionsData.getSessionsWithClubId || weekDates.length === 0) {
    return <div>Loading...</div>;
  }
  // if (error) return <p>Error: {error.message}</p>;

  const totalDayHeight = `${24 * 60}px`;
  const timeColumnWidth = '30px';

  return (
    <Flex direction='column' alignItems='center' h='calc(100vh)' w='calc(100vw)'>
      <Flex justify="space-between" w="100%" pt='0px' alignItems='center'>
        <Button size="sm" ml='5px' onClick={() => navigate("/owner-menu/")}>Menu</Button>
        {selectedTemplate ? (
          <Heading size="sm">{selectedTemplate.coach} - {selectedTemplate.templateName}</Heading>
        ) : (
          <Heading size="sm">Select a Template</Heading>
        )}
        <Select size='xs' w="110pxs" onChange={handleTemplateChange} value={selectedTemplate ? selectedTemplate.id : ""}
        >
          <option value="" disabled visable='false'>Select Template</option>
          {templateData?.getAllSevenDaySessionTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.templateName}
            </option>
          ))}
        </Select>
        <Button size="xs" mr='7px' onClick={handleApplyTemplate} disabled={isTemplateApplied()}>Apply Template</Button>
      </Flex>
      <Flex justify="space-between" w="70%" align="center">
        <Button size="sm" onClick={handlePrevWeek} mr="30px">&lt; Prev Week</Button>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="d-M-yy" // Or any format you prefer
          locale="en-GB"
          style={{ backgroundColor: 'lightgray', color: 'blue' }}
        />
        <Button size="sm" onClick={handleNextWeek}>Next Week &gt;</Button>
      </Flex>
      <Flex direction='column' w="full" h='800px'>
        {/* row for the date/days */}
        <Flex direction='row' align="center">
          <Box flexShrink='0' bg="gray.200" w={timeColumnWidth}></Box>
          {weekDays.map(({ day, date }, index) => (
            <Box key={index} flex="1" textAlign="center" h='30px' pt='1px' pb='1px' bg="gray.200" >
              <Text fontWeight="bold" lineHeight='16px'>{day}</Text>
              <Text fontSize="sm" lineHeight='10px'>{date}</Text>
            </Box>
          ))}
        </Flex>
        <Flex direction='row' flex='1' overflowX="scroll" ref={scrollContainerRef}>
          {/* Columns for the times and calendar */}
          <Flex h={totalDayHeight} w="full" align="stretch" p="0px">
            {/* Column for the times */}
            <Flex direction="column" w={timeColumnWidth} spacing="0" pt="0px" pr='6px' align="stretch" flexShrink={0}>
              {hours.map((hour, index) => (
                <Box key={hour} h="60px" position="relative">
                  <Text fontSize="xs"
                    position={index === 0 ? "static" : "absolute"}
                    bottom={index === 0 ? "unset" : "85%"}
                    left="0" >{`${hour}:00`}</Text>
                </Box>
              ))}
            </Flex>
            {/* Column for the calendar */}
            <Flex direction='row' flex='1' overflowX="none" w="99%" p="0px">
              {weekDates.map((date, index) =>
              (
                <Box key={index} flex="1" direction='row' position="relative" bg="gray.50" minWidth="100px">
                  {hours.map(hour => (
                    <Box key={hour} height="60px" position="relative">
                      <Divider borderColor="gray.500" position="absolute" bottom="0" width="full" />
                    </Box>
                  ))}
                  {renderSessionsForDay(sessionsData, date)}
                  {renderTemplateSessionsForDay(index)}
                </Box>
              )
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex >
  );
};

export default Bookings;
