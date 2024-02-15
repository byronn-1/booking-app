import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1); // Navigates back to the previous page

  return (
    <Button size="sm" onClick={goBack}>Back</Button>
  );
};

export default BackButton;
