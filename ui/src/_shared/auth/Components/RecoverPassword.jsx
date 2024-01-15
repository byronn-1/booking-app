import { useState, useEffect } from "react";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getPoolData } from "../services/poolService";

const RecoverPasswordSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
});

const RecoverPassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [userPool, setUserPool] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function initializeUserPool() {
      const poolData = await getPoolData();
      setUserPool(new CognitoUserPool(poolData));
    }
    initializeUserPool();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: RecoverPasswordSchema,
    onSubmit: ({ username }, { setSubmitting }) => {
      if (!userPool) {
        setErrorMsg("User Pool is not initialized. Please try again.");
        setSubmitting(false);
        return;
      }
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.forgotPassword({
        onSuccess: function () {
          setSubmitting(false);
          navigate("/reset-password", { state: { username } }); // This should be the route for your ResetPassword component
        },
        onFailure: function (err) {
          setErrorMsg(err.message || JSON.stringify(err));
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <VStack spacing={4}>
      <Box>Recover your Password</Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={formik.errors.username && formik.touched.username}
        >
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
          Recover Password
        </Button>
      </form>
    </VStack>
  );
};

export default RecoverPassword;