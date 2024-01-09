import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import WeekCalendar from '../_shared/Components/WeekCalendar';
import BackButton from '../_shared/Components/Buttons/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_MUTATION_WITHOUT_SESSIONS } from "../_graphQL/mutations/templateMutations"
const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const CreateWeekSessionsTemplate = () => {
  // Function to render content for each day
  const location = useLocation();
  const { templateName, coachName } = location.state || {};

  let navigate = useNavigate();

  // const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure()

  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);

  const [triggerSave, setTriggerSave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const [sessions, setSessions] = useState([]);

  const [createSevenDaySessionsTemplate] = useMutation(CREATE_SEVEN_DAY_SESSIONS_TEMPLATE_MUTATION_WITHOUT_SESSIONS);

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
    setIsModalOpen(false);
    actions.setSubmitting(false);
  };

  const renderContent = (day, index) => {
    const daySessions = sessions.filter(session => session.dayOfTheWeek === index + 1)
    .sort((a, b) => {
      return a.time.localeCompare(b.time);
    });;
    return (
      <VStack flex="1" p={2}>
        {daySessions.map((session, idx) => (
          <Text key={idx}>{session.time}:{session.sessionType} at {session.location}</Text>
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
        time:  addDateToTime(session.time),
      })),
    };
  
    console.log({ variables: { input } })
    createSevenDaySessionsTemplate({ variables: { input } })
      .then(response => {
        console.log("Successfully created template", response.data);
        // Additional success handling
      })
      .catch(error => {
        console.error("Error creating template", error);
        // Error handling
      });

      navigate("/bookings")
  };

  const addDateToTime = (time) => {
    const arbitraryDate = "2023-01-01"; // Example date
    return `${arbitraryDate}T${time}`;
  };

  
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

  if (isPortrait) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%', fontSize: '20px' }}>
        Please rotate your device to landscape mode.
      </div>
    );
  }
  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
      <BackButton/>
        <Heading size="md">{coachName} - {templateName}</Heading>
        <Button size="sm" onClick={processAndSaveSessions} >Save</Button>
      </Flex>
      <Flex overflowX="scroll" h="calc(100vh - 150px)">
      {daysOfWeek.map((day, index) => (
        <VStack key={day} flex="1" border="1px" borderColor="gray.200">
          <Box bg="gray.100" p={2} w="full">
            <Text fontWeight="bold">{day}</Text>
            <IconButton aria-label={`Add session on ${day}`} icon={<AddIcon />} size="sm" onClick={() => handleModalOpen(day, index)} />
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
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <ModalOverlay />
        <ModalContent>
          <Text> Save the template to your Saved Templates</Text>
          <Button onClick={processAndSaveSessions}>Save</Button>
          <Button>Cancel</Button>
          <ModalCloseButton />
        </ModalContent>
      </Modal> */}
    </Flex>
  </Box>
    
  );
};

export default CreateWeekSessionsTemplate;
