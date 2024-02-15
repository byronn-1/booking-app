import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Box, Flex, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading
} from '@chakra-ui/react';
import BackButton from '../_shared/Components/Buttons/BackButton';
import { useMutation } from '@apollo/client';
import { ADD_COACH_MUTATION } from '../_graphQL/mutations/coachMutations'; // Adjust the import path as necessary
import { GET_CLUB_DETAILS } from '../_graphQL/querys/clubQueries';
import { useSelector } from 'react-redux';

const CoachSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phoneNumber: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    club: Yup.number().required('Required'),
});


const CreateCoach = () => {
    const clubId = useSelector((state) => state.auth.clubId);

    const [addCoach, { data, loading, error }] = useMutation(ADD_COACH_MUTATION, {
        refetchQueries: [
            GET_CLUB_DETAILS, // Assuming you want to refresh club details after adding a coach
            'GetClubDetails' // Operation name of the GET_CLUB_DETAILS query
        ],
        // Optionally, you can use the `update` function to manually update the Apollo cache
    });

    const initialValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
    };



    const handleSubmit = (values, actions) => {
        console.log(values)
        addCoach({
            variables: {
                coachInput: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNo: values.phoneNumber,
                    email: values.email,
                    clubId: clubId,
                }
            }
        }).then(response => {
            // Handle response
            console.log('Coach added:', response.data.addCoach);
            actions.setSubmitting(false);
        }).catch(e => {
            console.error('Error in mutation:', e);
            actions.setSubmitting(false);
        });
    };

    useEffect(() => {
        if (data) {
            console.log('Mutation response data:', data);
        }

    }, [data])
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <Box p={4}>
            <Flex justify="space-between" mb={4}>
                <BackButton />
                <Heading size="md">Create Coach</Heading>
            </Flex>
            <Formik
                initialValues={initialValues}
                // validationSchema={CoachSchema}
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
    )
}

export default CreateCoach