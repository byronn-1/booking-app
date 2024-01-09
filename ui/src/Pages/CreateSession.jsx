import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading, Switch
} from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';
import { CREATE_SESSION_MUTATION } from '../_graphQL/mutations/sessionMutations';
import { useMutation } from '@apollo/client';

// Validation Schema using Yup
const SessionSchema = Yup.object().shape({
  sessionType: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  time: Yup.string().required('Required'),
  isBooked: Yup.boolean(),
  isPaidFor: Yup.boolean(),
  isCompleted: Yup.boolean(),
});

const CreateSession = () => {
  const initialValues = {
    sessionType: '',
    location: '',
    time: '',
    isBooked: false,
    isPaidFor: false,
    isCompleted: false,
  };

  const [createSessionMutation, { loading, error }] = useMutation(CREATE_SESSION_MUTATION);


  const handleSubmit = (values, actions) => {
    console.log(values)
    createSessionMutation({
      variables: {
        sessionInput: {
          sessionType: values.sessionType,
          location: values.location,
          time: values.time,
          isBooked: values.isBooked,  
          isPaidFor: values.isPaidFor,
          isCompleted: values.isCompleted,
        }
      }
    }).then(response => {
      console.log('Session created:', response.data.createSession);
      actions.setSubmitting(false);
    }).catch(e => {
      console.error('Error in mutation:', e);
      actions.setSubmitting(false);
    });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
      <BackButton/>
        <Heading size="md">Create Session</Heading>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={SessionSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, handleChange }) => (
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

            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="isBooked" mb="0">
                Is Booked
              </FormLabel>
              <Switch id="isBooked" name="isBooked" onChange={handleChange} />
            </FormControl>

            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="isPaidFor" mb="0">
                Is Paid For
              </FormLabel>
              <Switch id="isPaidFor" name="isPaidFor" onChange={handleChange} />
            </FormControl>

            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel htmlFor="isCompleted" mb="0">
                Is Completed
              </FormLabel>
              <Switch id="isCompleted" name="isCompleted" onChange={handleChange} />
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
