import React from 'react';
import Dropdown from './Dropdown';

const shortList = [...Array(5)].map((i) => ({ label: 'label', value: 'value' }));
const longList = [...Array(30)].map((i) => ({ label: 'label', value: 'value' }));

export default {
  title: 'Core/Dropdown',
  component: Dropdown,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    },
    options: {
      table: { disable: true }
    },
    onClick: {
      action: 'clicked'
    },
    value: {
      table: { disable: true }
    }
  }
};

const Template = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'dropdown',
  size: 'md',
  options: shortList
};

export const Long = Template.bind({});
Long.args = {
  ...Primary.args,
  options: longList
};
