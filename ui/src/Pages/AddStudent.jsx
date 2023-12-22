import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading
} from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';

// Validation Schema using Yup
const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const AddStudent = () => {
  // Initial values for our form
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  };

  // Function to handle form submission
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <BackButton/>
        <Heading size="md">Add Student</Heading>
        <Button size="sm">Save</Button>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={StudentSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormControl isInvalid={errors.firstName && touched.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Field as={Input} id="firstName" name="firstName" />
              <FormErrorMessage>{errors.firstName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.lastName && touched.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Field as={Input} id="lastName" name="lastName" />
              <FormErrorMessage>{errors.lastName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phoneNumber && touched.phoneNumber}>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Field as={Input} id="phoneNumber" name="phoneNumber" />
              <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email && touched.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field as={Input} id="email" name="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
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

export default AddStudent;
