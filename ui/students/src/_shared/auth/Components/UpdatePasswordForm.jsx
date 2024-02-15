import  { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
  useToast,
  Text
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { countryDialCodes } from "../services/dialCodes.js";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone_number: Yup.string()
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const UpdatePasswordForm = ({ user }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [errorMessage] = useState("");
  const [userAttributes, setUserAttributes] = useState(null);

  const callCognitoUpdatePassword = (values, actions) => {


    const newPassword =  values.password;
    // const processedPhoneNumber = `+${values.country}${values.phone_number.replace(/^0+/, 

    const requiredAttributes = {
      phone_number: values.phone_number
    };


    user.completeNewPasswordChallenge(newPassword, requiredAttributes, {
      onSuccess: () => {
        navigate("/landing");
      },
      onFailure: (error) => {
        console.log("Password change error:", error || JSON.stringify(error));
        actions.setFieldError("password", error.message);
        actions.setSubmitting(false);
      },

      newPasswordRequired: function (requiredAttributes) {
        // User was signed up by an admin and must provide new password and required attributes.
        delete requiredAttributes.email_verified;
        setUserAttributes(requiredAttributes);
        actions.setSubmitting(false);
      },
    });
  };

  return (
    <Center h="100vh" w="100vw" bg="white">
      <Formik
        initialValues={{ password: "", phone_number: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          callCognitoUpdatePassword(values, actions);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <VStack justify="center" flex={1} spacing="20px">
              {/* Email Field */}
              <Field name="email">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" />
                  </FormControl>
                )}
              </Field>
              <ErrorMessage name="email" component={FormErrorMessage} />

              {/* Password Field */}
              <Field name="password">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="password">Change Your Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={show ? "text" : "password"}
                        {...field}
                        id="password"
                      />
                      <InputRightElement
                        children={show ? <ViewIcon /> : <ViewOffIcon />}
                        onClick={() => setShow(!show)}
                      />
                    </InputGroup>
                    <FormErrorMessage>{props.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Phone Number Field */}
              <Field name="phone_number">
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                    <Input {...field} id="phone_number" />
                    <Text>Please remove the first 0 and add the country dial code e.g. +44 (UK)</Text>
                    <Text>Or +1 for United States</Text>
                  </FormControl>
                )}
              </Field>
              <ErrorMessage name="phone_number" component={FormErrorMessage} />

              <Button
                type="submit"
                size="lg"
                w="150px"
                isLoading={props.isSubmitting}
                px="10px"
              >
                Change Password
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Center>
  );
};

export default UpdatePasswordForm;