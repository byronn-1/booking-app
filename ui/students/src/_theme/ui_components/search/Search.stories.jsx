import React from 'react'
import Search from './Search'

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    onChange: {
      action: 'changed'
    }
  }
}

const Template = (args) => <Search {...args} />

export const Primary = Template.bind({})
Primary.args = {}