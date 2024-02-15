import React, { useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { initializeUserPool, userPool } from '../services/poolService.js';
import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    Button,
    FormErrorMessage,
    Select,
    RadioGroup,
    Heading,
    Flex,
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { countryDialCodes } from '../services/dialCodes.js';

import { studentValidationSchema } from '../services/validationSchemas.js';
import { graphqlClient } from '../../../graphql.js';
import { CREATE_CLUB_WITH_OWNER_MUTATION } from '../../../_graphQL/mutations/clubAndOwnerMutations.js';
import { ADD_STUDENT_MUTATION } from '../../../_graphQL/mutations/studentMutations.js';


const StudentSignUp = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const signUp = async ({
        first_name,
        last_name,
        username,
        password,
        phone_number,
        setSubmitting }) => {

        await initializeUserPool();
        let finalPhoneNumber = '';

        if (phone_number) {
            finalPhoneNumber = phone_number.startsWith('0') ? phone_number.substring(1) : phone_number;
            finalPhoneNumber = finalPhoneNumber.startsWith(country) ? finalPhoneNumber : country + finalPhoneNumber;
        }

        const studentInput = {
            firstName: first_name,
            lastName: last_name,
            phoneNo: finalPhoneNumber,
            email: username,
            club: null
        };

        try {
            const response = await graphqlClient.mutate({
                mutation: ADD_STUDENT_MUTATION,
                variables: {
                    studentInput
                }
            });

            const studentId = response.data.AddStudent.club.id;

            const attributeList = [
                new CognitoUserAttribute({ Name: 'email', Value: username }),
                new CognitoUserAttribute({ Name: 'phone_number', Value: finalPhoneNumber }),
                new CognitoUserAttribute({ Name: 'custom:isOwner', Value: 'false' }),
                new CognitoUserAttribute({ Name: 'custom:studentId', Value: studentId })
            ];

            const bypassCognito = false;

            let cognitoResponse = null
            if (response.data.createClubWithOwner) {
                if (!bypassCognito) {
                    cognitoResponse = await new Promise((resolve, reject) => {

                        userPool.signUp(username, password, attributeList, null, (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result)
                            }
                        });
                    });
                    navigate('/confirm-verification-code');
                } else {
                    console.log("Club and Owner creation failed in backend.")
                }
            }
        } catch (apiError) {
            console.log("Error during club/owner creation:", apiError);
        } finally {
            setSubmitting(false);
        };
    }

    return (
        <Flex ml="20px">
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    username: '',
                    password: '',
                    phone_number: ''
                }}
                validationSchema={studentValidationSchema}
                onSubmit={(values, actions) => {
                    console.log('form submitted', values)
                    signUp({ ...values, setSubmitting: actions.setSubmitting });
                }}
            >
                {({ values, errors, isSubmitting }) => {
                    return (

                        <Form >
                            <VStack mt="20px" spacing={5}>
                                <Heading size="md">User Info</Heading >
                                <Field name="username">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="username">Email</FormLabel>
                                            <Input ml="8px" w="200px" {...field} id=" username" />
                                            <ErrorMessage name="username" component={FormErrorMessage} />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <Input ml="8px" w="200px" {...field} type={show ? 'text' : 'password'} id="password" />
                                            <ErrorMessage name="password" component={FormErrorMessage} />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="country">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="country">Country</FormLabel>
                                            <Select {...field} id="country">
                                                {Object.entries(countryDialCodes).map(([country, code]) => (
                                                    <option value={code} key={code}>
                                                        {`${country} (${code})`}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="phone_number">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                                            <Input ml="8px" w="200px" {...field} id="phone_number" />
                                            <ErrorMessage name="phone_number" component={FormErrorMessage} />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="first_name">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="first_name">First Name</FormLabel>
                                            <Input ml="8px" w="200px" {...field} id="first_name" />
                                            <ErrorMessage name="first_name" component={FormErrorMessage} />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="last_name">
                                    {({ field }) => (
                                        <FormControl>
                                            <FormLabel htmlFor="last_name">Last Name</FormLabel>
                                            <Input ml="8px" w="200px" {...field} id="last_name" />
                                            <ErrorMessage name="last_name" component={FormErrorMessage} />
                                        </FormControl>
                                    )}
                                </Field>
                            </VStack>
                            {errors.form && <div>{errors.form}</div>}
                            <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} mt="20px" >Sign Up</Button>
                        </Form>
                    )
                }}
            </Formik>
        </Flex>
    );
};

export default StudentSignUp;