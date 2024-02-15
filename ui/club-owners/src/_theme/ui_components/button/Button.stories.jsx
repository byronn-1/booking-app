import React from 'react';
import { Button } from '@chakra-ui/react';

export default {
  title: 'Core/Button',
  component: Button,
  args: {
    label: 'button',
    variant: 'primary'
  },
  argTypes: {
    variant: {
      options: ['primary', 'alternate'],
      control: { type: 'radio' }
    },
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    },
    isDisabled: {
      control: { type: 'boolean' }
    },
    isLoading: {
      control: { type: 'boolean' }
    },
    onClick: {
      action: 'clicked'
    }
  }
};

const Template = (args) => <Button {...args}>{args.label}</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'md',
  isDisabled: false,
  isLoading: false
};

export const Alternate = Template.bind({});
Alternate.args = {
  ...Primary.args,
  variant: 'alternate'
};
