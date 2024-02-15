import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import PropType from 'prop-types';
import React from 'react';
// import { BsSearch } from 'react-icons/bs';

const Search = ({ onChange, value }) => {
  return (
    <InputGroup w="150px" size="search">
      <Input placeholder="Search" onChange={(e) => onChange(e.target.value)} value={value} />
      <InputRightElement /* children={<BsSearch />} */ />
    </InputGroup>
  );
};

export default Search;
Search.defaultProps = {
  onChange: (e) => console.log(e)
};
Search.propTypes = {
  onChange: PropType.func
};
