import  {  useEffect, useState } from 'react';
import PropType from 'prop-types';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Highlight,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import  { getPoolData }  from '../services/poolService.js';  
//ICONS
// import Logo from '../../assets/logo.png';
// import HubLogo from '../../assets/hub_logo.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UpdatePasswordForm from './UpdatePasswordForm.jsx';


const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});


const Login = ({ sbInvalid }) => {
  const navigate = useNavigate();
  const formWidth = '250px';
  
  const [show, setShow] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [session, setSession] = useState(null);
  const [cognitoUser, setCognitoUser] = useState(null);
  const [userPool, setUserPool] = useState(null); // <-- Add this line

  useEffect(() => {
      async function initializeUserPool() {
          const poolData = await getPoolData();
          setUserPool(new CognitoUserPool(poolData));
      }
      initializeUserPool();
  }, []);

  const handleCognitoResponse = (response) => {
    // Check if the response includes the ChallengeName property
    if (response && response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      setShowPasswordChangeForm(true);
    } else {
      // Handle other types of responses or proceed as needed
    }
  };

  const handleSubmit = (values) => {
      const authenticationData = {
        Username: values.userName,
        Password: values.password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
        Username: values.userName,
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
           
            setSession(result);
            navigate('/');
        },
        onFailure: (err) => {
           console.log('Authentication Error: ', err); 
          if(err.code === "UserNotConfirmedException") {
            navigate('/confirm-verification-code');
            return;
          }
            setErrorMessage(err.message || JSON.stringify(err));
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired:', data);
          setShowPasswordChangeForm(true)
          setCognitoUser(cognitoUser);
        },
    });
}
if (cognitoUser) {
  return <UpdatePasswordForm userPool={userPool}
  user={cognitoUser}/>;
}


  return (
    <Center h="100vh" w="100vw" bg="base.background">
      <Formik
       initialValues={{ userName: '', password: '' }}
       onSubmit={handleSubmit}
       validationSchema={LoginSchema}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Flex
            bg="#FEF9F6"
            h="550px"
            w="400px"
            borderColor="base.border"
            borderWidth="1px"
            borderRadius="6px"
            shadow="lg"
            p="5px"
            direction="column"
          >
            <Center w="full" minH="200px" mb="10px">
              <Image src='./wreath-logo.png' h="200px" alt="CrewCoord" />
            </Center>
            <Center>
              <Divider borderColor="base.border" w="80%" />
            </Center>
            <VStack justify="center" flex={1} spacing="20px">
              <FormControl w={formWidth} isInvalid={sbInvalid}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  w={formWidth}
                  id="userName"
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                />
                <FormErrorMessage>Username Required</FormErrorMessage>
              </FormControl>
              <FormControl w={formWidth} isInvalid={sbInvalid}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={show ? 'text' : 'password'}
                    w={formWidth}
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <InputRightElement children={show ? <ViewIcon /> : <ViewOffIcon />} onClick={() => setShow(!show)} />
                </InputGroup>
                <FormErrorMessage>Password Required</FormErrorMessage>
              </FormControl>
              {errorMessage && <div>{errorMessage}</div>} 
            </VStack>

            <Center minH="60px" flexDirection="column">
              <Button size="lg" w="150px"  onClick={handleSubmit}>
                SIGN IN
              </Button>
            </Center>
            <Center flexDirection="column">
              <Link style={{ textDecoration: 'underline', color: 'base.font', fontWeight: 'bold', cursor: 'pointer' }} to="/recover-password">Forgot Password?</Link>
            </Center>
            <Flex minH="40px" align="center" justify="flex-start">
              <Image   alt="" h="30px" />
            </Flex>
          </Flex>
        )}
      </Formik>

     
    </Center>
  );
};

export default Login;
Login.defaultProps = {
  sbInvalid: false
};
Login.propTypes = {
  sbInvalid: PropType.bool
};
