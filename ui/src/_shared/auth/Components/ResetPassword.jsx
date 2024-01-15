import { useState } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, VStack } from '@chakra-ui/react';
// import { userPool } from '../services/poolService';

const ResetPasswordSchema = Yup.object().shape({
  verificationCode: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
});

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state; // We passed this in the RecoverPassword component

  const formik = useFormik({
    initialValues: {
      verificationCode: '',
      newPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: ({ verificationCode, newPassword }, { setSubmitting }) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
          setSubmitting(false);
          navigate('/login'); // They should log in with their new password now
        },
        onFailure(err) {
          setErrorMsg(err.message || JSON.stringify(err));
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <VStack spacing={4}>
      <Box>Reset your Password</Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.verificationCode && formik.touched.verificationCode}>
          <FormLabel htmlFor="verificationCode">Verification Code</FormLabel>
          <Input
            id="verificationCode"
            name="verificationCode"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.verificationCode}
          />
          <FormErrorMessage>{formik.errors.verificationCode}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.errors.newPassword && formik.touched.newPassword}>
          <FormLabel htmlFor="newPassword">New Password</FormLabel>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
        </FormControl>

        {errorMsg && <div>{errorMsg}</div>}

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formik.isSubmitting}
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </VStack>
  );
};

export default ResetPassword;