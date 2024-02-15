import { Input } from '@chakra-ui/react'
import React from 'react'

export default {
  title: 'Core/Input',
  component: Input,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' }
    },
    onChange: {
      action: 'changed'
    }
  }
}

const Template = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
  size: 'md',
  placeholder: 'Input',
  onChange: (e) => e.target.value,
}