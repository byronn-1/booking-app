import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading, Switch
} from '@chakra-ui/react';
import BackButton from '../../_shared/Components/Buttons/BackButton';
import { addStudentService } from './service';
import { useMutation } from '@apollo/client';
import { ADD_STUDENT_MUTATION } from '../../_graphQL/mutations/StudentMutations';

// Validation Schema using Yup
const StudentSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone number is not valid').required('Required'),
  isWaiverSigned: Yup.boolean().required('Required'),
});

const AddStudent = () => {
  // Initial values for our form
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    isWaiverSigned: false,
  };

  const [addStudentMutation, { data, loading, error }] = useMutation(ADD_STUDENT_MUTATION);


  const handleSubmit = (values, actions) => {
    addStudentMutation({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNo: values.phoneNumber, // Ensure the field names match your GraphQL schema
          isWaiverSigned: values.isWaiverSigned,
          // Add other necessary fields
        }
      }
    }).then(response => {
      // Handle response
      console.log('Student added:', response.data.addStudent);
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
        <Heading size="md">Add Student</Heading>
        <Button size="sm">Save</Button>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={StudentSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue, values}) => (
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

            <FormControl isInvalid={errors.isWaiverSigned && touched.isWaiverSigned}>
              <FormLabel htmlFor="isWaiverSigned">Waiver Signed</FormLabel>
              <Switch id="isWaiverSigned" name="isWaiverSigned" isChecked={values.isWaiverSigned} onChange={() => setFieldValue('isWaiverSigned', !values.isWaiverSigned)} />
              <FormErrorMessage>{errors.isWaiverSigned}</FormErrorMessage>
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
