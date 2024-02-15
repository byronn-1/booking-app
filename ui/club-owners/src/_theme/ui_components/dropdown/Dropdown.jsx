import React from 'react';
import PropType from 'prop-types';
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Dropdown = ({ placeholder, value, options, onClick, size, ...rest }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            // size={size}
            size={{ base: 'sm' }}
            variant="dropdown"
            rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {...rest}
          >
            <Text noOfLines="1">{options.find((x) => x.value === value)?.label || placeholder}</Text>
          </MenuButton>
          <MenuList>
            {options.map(({ label, value }, i) => (
              <MenuItem value={value} key={i} onClick={(e) => onClick(e.target.value)}>
                {label}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;

Dropdown.defaultProps = {
  placeholder: 'menu',
  value: null,
  options: [{ label: 'label', value: 'value' }],
  onClick: (value) => console.log(value),
  size: 'md'
};
Dropdown.propTypes = {
  placeholder: PropType.string,
  value: PropType.oneOfType([PropType.string, PropType.number]),
  onClick: PropType.func,
  size: PropType.string,
  options: PropType.arrayOf(
    PropType.shape({ label: PropType.string, value: PropType.oneOfType([PropType.string, PropType.number]) })
  )
};
