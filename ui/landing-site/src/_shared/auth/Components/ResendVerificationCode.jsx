import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack } from "@chakra-ui/react";
// import { userPool } from "../services/poolService";

const ResendVerificationSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
});

const ResendVerificationCode = () => {
  const [errorMsg, setErrorMsg] = useState("");
  
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: ResendVerificationSchema,
    onSubmit: ({ username }, { setSubmitting }) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.resendConfirmationCode((err) => {
        if (err) {
          setErrorMsg(err.message || JSON.stringify(err));
        } else {
          // On success, navigate to the confirmation page
          // navigate('/confirm'); 
        }
        setSubmitting(false);
      });
    },
  });

  return (
    <VStack spacing={4}>
      <Box>Resend Verification Code</Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.username && formik.touched.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
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

        {errorMsg && <div>{errorMsg}</div>}

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formik.isSubmitting}
          type="submit"
        >
          Resend Verification Code
        </Button>
      </form>
    </VStack>
  );
};

export default ResendVerificationCode;