import React from 'react';
import PropTypes from 'prop-types';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Flex, Text, CardBody, CardHeader, Card } from '@chakra-ui/react';
import  PopoverWrapper  from './PopoverWrapper';

const CardWrapper = ({ header, title, message, showInformation, children }) => {
  return (
    <Card  display="flex">
      <CardHeader>
        <Flex>
          <Text>{title}</Text>
        </Flex>
        <Flex>
          {showInformation && (
            <PopoverWrapper header={header} message={message}>
              <InfoOutlineIcon h={{ base: '15px', md: '20px' }} w="auto" cursor="pointer" />
            </PopoverWrapper>
          )}
        </Flex>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export default CardWrapper;

CardWrapper.defaultProps = {
  title: 'title',
  showInformation: true
};
CardWrapper.propTypes = {
  title: PropTypes.string,
  showInformation: PropTypes.bool
};
