import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading
} from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';

// Validation Schema using Yup
const SessionSchema = Yup.object().shape({
  sessionType: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  student: Yup.string().required('Required'),
  time: Yup.string().required('Required'),
});

const CreateSession = () => {
  const initialValues = {
    sessionType: '',
    location: '',
    student: '',
    time: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
      <BackButton/>
        <Heading size="md">Create Session</Heading>
        <Button size="sm">Save</Button>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={SessionSchema}
        onSubmit={handleSubmit}
      >
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

            <FormControl isInvalid={errors.student && touched.student}>
              <FormLabel htmlFor="student">Student</FormLabel>
              <Field as={Input} id="student" name="student" />
              <FormErrorMessage>{errors.student}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.time && touched.time}>
              <FormLabel htmlFor="time">Time</FormLabel>
              <Field as={Input} id="time" name="time" type="datetime-local" />
              <FormErrorMessage>{errors.time}</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateSession;
