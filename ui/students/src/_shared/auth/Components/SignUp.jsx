import React, { useState } from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { initializeUserPool, userPool } from '../services/poolService';
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  FormErrorMessage,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Text,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { countryDialCodes } from '../services/dialCodes.js';
import { CREATE_CLUB_MUTATION } from '../../../_graphQL/mutations/clubMutations.js';
import { ADD_OWNER_MUTATION } from '../../../_graphQL/mutations/ownerMutation.js';
import { validationSchema } from '../services/validationSchemas.js';
import { graphqlClient } from '../../../graphql.js';
import { CREATE_CLUB_WITH_OWNER_MUTATION } from '../../../_graphQL/mutations/clubAndOwnerMutations.js';



const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const signUp = async ({
    first_name,
    last_name,
    username,
    password,
    phone_number,
    country,
    club_name,
    club_type,
    street_number,
    street_name,
    address_line2,
    city,
    state,
    postal_code,
    is_club_private,
    website_url,
    setSubmitting }) => {

    await initializeUserPool();
    let finalPhoneNumber = '';
    let is_club_private_bool = false;

    if (phone_number) {
      finalPhoneNumber = phone_number.startsWith('0') ? phone_number.substring(1) : phone_number;
      finalPhoneNumber = finalPhoneNumber.startsWith(country) ? finalPhoneNumber : country + finalPhoneNumber;
    }
    if (is_club_private === '1') {
      is_club_private_bool = true;
    }

    const ownerInput = {
      firstName: first_name,
      lastName: last_name,
      phoneNo: finalPhoneNumber,
      email: username,
      club: null
    };
    const clubInput = {
      clubName: club_name,
      clubType: club_type,
      streetNumber: street_number,
      streetName: street_name,
      addressLine2: address_line2,
      city,
      state,
      postalCode: postal_code,
      country,
      accCreated: new Date().toISOString(),
      websiteUrl: website_url,
      isClubPrivate: is_club_private_bool
    };

    try {
      const response = await graphqlClient.mutate({
        mutation: CREATE_CLUB_WITH_OWNER_MUTATION,
        variables: {
          ownerInput,
          clubInput
        }
      });

      const ownerId = response.data.createClubWithOwner.club.id;
      const clubId = response.data.createClubWithOwner.owner.id;

      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: username }),
        new CognitoUserAttribute({ Name: 'phone_number', Value: finalPhoneNumber }),
        new CognitoUserAttribute({ Name: 'custom:isOwner', Value: 'true' }),
        new CognitoUserAttribute({ Name: 'custom:ownerId', Value: ownerId }),
        new CognitoUserAttribute({ Name: 'custom:clubId', Value: clubId })
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
          phone_number: '',
          country: '+44',
          club_name: '',
          club_type: '',
          street_number: '',
          street_name: '',
          address_line2: '',
          city: '',
          state: '',
          postal_code: '',
          isclub_private: '1',
          website_url: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log('form submitted', values)
          signUp({ ...values, setSubmitting: actions.setSubmitting });
        }}
      >
        {({ values, errors, isSubmitting }) => {
          return (

            <Form >
              <VStack mt="20px" spacing={5}>
                <Heading size="md">Owner Info</Heading >
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
              <VStack mt="30px">
                <Heading size="md">Club Info</Heading>
                <Field name="club_name">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="club_name">Club Name</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="club_name" />
                      <ErrorMessage name="club_name" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="club_type">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="club_type">Club Type</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="club_type" />
                      <ErrorMessage name="club_type" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="street_number">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="street_number">Street Number</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="street_number" />
                      <ErrorMessage name="street_number" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="street_name">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="street_name">Street Name</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="street_name" />
                      <ErrorMessage name="street_name" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="address_line2">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="address_line2">Address Line 2</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="address_line2" />
                      <ErrorMessage name="address_line2" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="city">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="city" />
                      <ErrorMessage name="city" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="state">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="state">Region/County</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="state" />
                      <ErrorMessage name="state" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="postal_code">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="postal_code">Post Code</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="postal_code" />
                      <ErrorMessage name="postal_code" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="is_club_private">
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel htmlFor="is_club_private">Is Club Invitation Only</FormLabel>
                      <RadioGroup ml="8px" {...field} id="is_club_private" onChange={val => form.setFieldValue("isclub_private", val)}>
                        <Stack direction='row'>
                          <Radio value='1'>No</Radio>
                          <Radio value='2'>Yes</Radio>
                        </Stack>
                      </RadioGroup>
                      <ErrorMessage name="is_club_private" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Field name="website_url">
                  {({ field }) => (
                    <FormControl>
                      <FormLabel htmlFor="website_url">Club Website</FormLabel>
                      <Input ml="8px" w="200px" {...field} id="website_url" />
                      <ErrorMessage name="website_url" component={FormErrorMessage} />
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

export default SignUp;