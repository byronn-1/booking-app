import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../_shared/Components/Buttons/BackButton';
import { GET_COACHES_FROM_CLUB_ID } from '../_graphQL/querys/coachQueries';
import { useSelector } from 'react-redux';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_CLUB_DETAILS } from '../_graphQL/querys/clubQueries';
import { GET_OWNER_BY_CLUB_ID } from '../_graphQL/querys/ownerQueries';

const WeekTemplateSchema = Yup.object().shape({
  templateName: Yup.string().required('Required'),
  coachName: Yup.string(),
});

const CreateWeekTemplate = () => {
  const navigate = useNavigate();

  const client = useApolloClient();

  const clubId = useSelector((state) => state.auth.clubId);

  const { data, loading, error } = useQuery(GET_COACHES_FROM_CLUB_ID, {
    variables: { clubId: clubId },
  });

  const { data: ownerData, loading: ownerDataLoading, error: ownerDataError } = useQuery(GET_OWNER_BY_CLUB_ID, {
    variables: { clubId: clubId },
  });

  const clubDetails = client.readQuery({
    query: GET_CLUB_DETAILS,
    variables: { clubId: clubId },
  });

  const [selectedEntity, setSelectedEntity] = useState({ id: '', name: '', type: '' });

  const hasCoaches = clubDetails?.getClubFromClubId?.hasCoaches || false;

  const initialValues = {
    templateName: '',
    coachName: '',
  };

  const handleSubmit = (values, actions) => {
    console.log('Form values:', values);
    // Example action: navigate to another route with template name and coach name
    navigate('/create-week-sessions-template', {
      state: {
        templateName: values.templateName,
        entity: selectedEntity, // Pass the entire selected entity
      },
    });
    actions.setSubmitting(false);
  };

  const handleCoachChange = (e, setFieldValue) => {
    const value = e.target.value;
    const [type, id] = value.split('-');

    if (type === 'coach') {
      const coach = data.getCoachesFromClubId.find(c => `coach-${c.id}` === value);
      if (coach) {
        setSelectedEntity({ id: coach.id, name: `${coach.firstName} ${coach.lastName}`, type: 'coach' });
      }
    } else if (type === 'owner') {
      setSelectedEntity({ id: ownerData.getOwnerByClubId.id, name: `${ownerData.getOwnerByClubId.firstName} ${ownerData.getOwnerByClubId.lastName}`, type: 'owner' });
    }

    setFieldValue('coachName', value); // Update this to reflect the combined string value
  };


  useEffect(() => {
    if (data && data.getCoachesFromClubId.length === 1) {
      // Automatically set the coach name if only one coach is returned
      setSelectedEntity(data.getCoachesFromClubId[0].id);
    }
  }, [data]);

  useEffect(() => {
    console.log("club ID: ", clubId)
    console.log(ownerData)
  }, [ownerData])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;


  return (
    <Box p={4}>
      <Flex justify="space-between" mb={4}>
        <BackButton />
        <Heading size="md">Create Template</Heading>
        <Button size="sm" type="submit" form="week-template-form">Save & Add Sessions</Button>
      </Flex>
      <Formik initialValues={initialValues} validationSchema={WeekTemplateSchema} onSubmit={handleSubmit}>
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form id="week-template-form">
            <FormControl isInvalid={errors.templateName && touched.templateName}>
              <FormLabel htmlFor="templateName">Template Name</FormLabel>
              <Field as={Input} id="templateName" name="templateName" />
              <FormErrorMessage>{errors.templateName}</FormErrorMessage>
            </FormControl>
            {hasCoaches && (
              <FormControl>
                <FormLabel htmlFor="coachName">Coach Name</FormLabel>
                {/* Use Field component with "as" prop set to "select" */}
                <Field as={Select} id="coachName" name="coachName"
                  value={selectedEntity.type === 'coach' ? `coach-${selectedEntity.id}` : `owner-${selectedEntity.id}`}
                  onChange={(e) => handleCoachChange(e, setFieldValue)}>
                  <option value="">Select Coach</option>
                  <option value={`owner-${ownerData?.getOwnerByClubId?.id}`}>{`${ownerData?.getOwnerByClubId?.firstName} ${ownerData?.getOwnerByClubId?.lastName} (Owner)`}</option>
                  {data.getCoachesFromClubId.map((coach) => (
                    <option key={`coach-${coach.id}`} value={`coach-${coach.id}`}>{`${coach.firstName} ${coach.lastName}`}</option>
                  ))}
                </Field>
              </FormControl>
            )}

          </Form>
        )}
      </Formik>
    </Box >
  );
};

export default CreateWeekTemplate;
