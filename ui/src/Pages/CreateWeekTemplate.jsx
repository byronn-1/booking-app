import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../_shared/Components/Buttons/BackButton';

// Validation Schema using Yup
const WeekTemplateSchema = Yup.object().shape({
  templateName: Yup.string().required('Required'),
  coachName: Yup.string().required('Required'),
});

const CreateWeekTemplate = () => {
    const navigate = useNavigate();
  const initialValues = {
    templateName: '',
    coachName: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
      <BackButton/>
        <Heading size="md">Create Template</Heading>
        <Button size="sm" onClick={() => navigate('/create-week-sessions-template')}>Save & Add Sessions</Button>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={WeekTemplateSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <FormControl isInvalid={errors.templateName && touched.templateName}>
              <FormLabel htmlFor="templateName">Template Name</FormLabel>
              <Field as={Input} id="templateName" name="templateName" />
              <FormErrorMessage>{errors.templateName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.coachName && touched.coachName}>
              <FormLabel htmlFor="coachName">Coach Name</FormLabel>
              <Field as={Input} id="coachName" name="coachName" />
              <FormErrorMessage>{errors.coachName}</FormErrorMessage>
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

export default CreateWeekTemplate;
