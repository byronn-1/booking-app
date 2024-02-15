import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_MUTATION } from "../../_graphQL/mutations/templateMutations.js"
const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const WeekCalendar = ({ showDates = false, templateName, coachName, onTriggerSave }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [sessions, setSessions] = useState([]);

  const [createSevenDaySessionsTemplate] = useMutation(CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_MUTATION);

  const initialValues = {
    sessionType: '',
    location: '',
    time: '',
  };

  const sessionSchema = Yup.object().shape({
    sessionType: Yup.string().required('Required'),
    location: Yup.string().required('Required'),
    time: Yup.string().required('Required'),
  });

  const handleModalOpen = (day, index) => {
    setActiveDay({ day, index });
    setIsModalOpen(true);
  };

  const handleSessionSubmit = (values, actions) => {
    const newSession = {
      ...values,
      templateName: templateName,
      coachName: coachName,
      dayOfTheWeek: activeDay.index + 1,
    };
    setSessions([...sessions, newSession]);
    setParentSessions(prevSessions => [...prevSessions, newSession]);
    setIsModalOpen(false);
    actions.setSubmitting(false);
  };


  useEffect(() => {
    console.log(sessions)
  }, [sessions]);

  useEffect(() => {
    if (onTriggerSave) {
      // Perform the action when the save button is clicked
      saveSessions();
    }
  }, [onTriggerSave]);

  const saveSessions = () => {
    const input = {
      templateName: templateName,
      coach: coachName,
      sessionTemplates: sessions.map(session => ({
        sessionType: session.sessionType,
        location: session.location,
        dayOfTheWeek: session.dayOfTheWeek,
        time: session.time, // Make sure this is in the correct format
      })),
    };

  const renderContent = (day, index) => {
    const daySessions = sessions.filter(session => session.dayOfTheWeek === index + 1);
    return (
      <VStack flex="1" p={2}>
        {daySessions.map((session, idx) => (
          <Text key={idx}>{session.sessionType} at {session.location} - {session.time}</Text>
        ))}
      </VStack>
    );
  };
  
  const processAndSaveSessions = () => {
    const input = {
      templateName: templateName,
      coach: coachName,
      sessionTemplates: sessions.map(session => ({
        sessionType: session.sessionType,
        location: session.location,
        dayOfTheWeek: session.dayOfTheWeek,
        time: session.time,
      })),
    };
  }

    createSevenDaySessionsTemplate({ variables: { input } })
      .then(response => {
        console.log("Successfully created template", response.data);
        // Additional success handling
      })
      .catch(error => {
        console.error("Error creating template", error);
        // Error handling
      });
  };

  return (
    <Flex overflowX="scroll" h="calc(100vh - 150px)">
      {daysOfWeek.map((day, index) => (
        <VStack key={day} flex="1" border="1px" borderColor="gray.200">
          <Box bg="gray.100" p={2} w="full">
            <Text fontWeight="bold">{day}</Text>
            <IconButton aria-label={`Add session on ${day}`} icon={<AddIcon />} size="sm" onClick={() => handleModalOpen(day, index)} />
            {showDates && <Text fontSize="xs">Date</Text>}
          </Box>
          {renderContent(day, index)}
        </VStack>
      ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Session for {activeDay?.day}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik initialValues={initialValues} validationSchema={sessionSchema} onSubmit={handleSessionSubmit}>
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <FormControl isInvalid={errors.sessionType && touched.sessionType}>
                    <FormLabel htmlFor="sessionType">Session Type</FormLabel>
                    <Field as={Input} id="sessionType" name="sessionType" />
                    <FormErrorMessage>{errors.sessionType}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.location && touched.location}>
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <Field as={Input} id="location" name="location" />
                    <FormErrorMessage>{errors.location}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.time && touched.time}>
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Field as={Input} id="time" name="time" type="time" />
                    <FormErrorMessage>{errors.time}</FormErrorMessage>
                  </FormControl>
                  <Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default WeekCalendar;
