import React from 'react';
import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const PageWrapper = ({ direction, children }) => {
  return (
    <Flex direction={direction} w={{ base: 'full', '2xl': '2xl' }}>
      {children}
    </Flex>
  );
};

export default PageWrapper;
PageWrapper.defaultProps = {
  direction: 'column'
};
PageWrapper.propTypes = {
  direction: PropTypes.string
};
