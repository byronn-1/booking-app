import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack } from "@chakra-ui/react";
// import { userPool } from "../services/poolService";
import { useNavigate } from 'react-router-dom';
import { initializeUserPool } from "../services/jwtAuthService";
// import { initializeUserPool, getCurrentUser } from '../path/to/jwtAuthService';


const ConfirmVerificationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  code: Yup.string().required('Required'),
});

const ConfirmVerificationCode = () => {
  const navigate = useNavigate();

  const [userPool, setUserPool] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const resendCode = () => {
    const user = new CognitoUser({
      Username: formik.values.username,
      Pool: userPool,
    });

    user.resendConfirmationCode((err, result) => {
      if (err) {
        setErrorMsg(err.message || JSON.stringify(err));
        return;
      }
      console.log('Confirmation code resent successfully.');
    });
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      code: "",
    },
    // ... your validation schema and other formik settings
    onSubmit: async ({ username, code }, { setSubmitting }) => {
      if (!userPool) {
        setErrorMsg("User pool not initialized. Please try again.");
        return;
      }

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          setErrorMsg(err.message || JSON.stringify(err));
          setSubmitting(false);
        } else {
          setSubmitting(false);
          navigate('/login'); // Redirect to login or another page
        }
      });
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const pool = await initializeUserPool();
        setUserPool(pool);
      } catch (error) {
        console.error("Error initializing user pool:", error);
        // Handle initialization error (e.g., show an error message or redirect)
      }
    };
    init();
  }, []);


  return (
    <VStack spacing={4}>
      <Box>Confirm your email</Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.username && formik.touched.username}>
          <FormLabel htmlFor="username">Email</FormLabel>
          <Input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.code && formik.touched.code}>
          <FormLabel htmlFor="code">Verification Code</FormLabel>
          <Input
            id="code"
            name="code"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          <FormErrorMessage>{formik.errors.code}</FormErrorMessage>
        </FormControl>

        {errorMsg && <div>{errorMsg}</div>}

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formik.isSubmitting}
          type="submit"
        >
          Confirm
        </Button>

        <Button
          mt={4}
          colorScheme="blue"
          onClick={resendCode}
        >
          Resend Code
        </Button>
      </form>
    </VStack>

  );
};

export default ConfirmVerificationCode;