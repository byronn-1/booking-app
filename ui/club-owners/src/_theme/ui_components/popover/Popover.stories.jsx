import React from 'react';
import * as PopoverWrapper from '../../../_layout/PopoverWrapper';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { chakra } from "@chakra-ui/system"

export default {
  title: 'Components/Popover',
  component: Popover,
  decorators: [
    (story) => (
      <chakra.div mx="auto" >
        {story()}
      </chakra.div>
    ),
  ],
};

const Template = (args) => {

  return(
    <Popover placement="right-start">
    <PopoverTrigger>
      <InfoOutlineIcon />
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>Sample Popover Header</PopoverHeader>
      <PopoverBody>
        This is sample text
      </PopoverBody>
    </PopoverContent>
  </Popover>
  )
};

export const Primary = Template.bind({});
Primary.args = {
  backGroundColor: '#ff0'
};
