import React from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import {  ArrowLeftIcon, InfoOutlineIcon  } from '@chakra-ui/icons';

import PopoverWrapper from './PopoverWrapper';

const Header = ({ title, showBack, pageDesc}) => {
  return (
    <Flex w="full" py="10px">
      {showBack && (
        <Flex w="40px" align="center" justify="flex-start">
          <IconButton variant="icon" size="icon" icon={<ArrowLeftIcon w="15px" h="15px" />} />
        </Flex>
      )}
      <Flex flex={1} align="center" justify="flex-start">
        <Text
          textTransform="capitalize"
          fontSize={{ base: '16px', sm: '18px', md: '22px' }}
          fontWeight="bold"
          fontFamily="heading"
        >
          {title}
        </Text>
      </Flex>
      <Flex w="80px" align="center" justify="flex-end">
        <PopoverWrapper header={`This is the ${title} page`} message={pageDesc} >
        <IconButton
            variant="icon"
            size="icon"
            icon={<InfoOutlineIcon w={{ base: '20px', md: '20px' }} h={{ base: '20px', md: '20px' }} />}
        />
        </PopoverWrapper>
      </Flex>
    </Flex>
  );
};

export default Header;
Header.defaultProps = {
  title: 'title',
  pageDesc: 'On this page you can',
  showBack: false,
};
Header.propTypes = {
  title: PropTypes.string,
  showBack: PropTypes.bool
};
