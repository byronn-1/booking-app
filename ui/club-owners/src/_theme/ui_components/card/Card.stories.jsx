import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Card from './Card'

export default {
  title: 'Components/Card',
  component: Card
}

const Template = (args) => {
  return (
    <Card {...args}>
      <Flex p='10px'>
        <Text>Content</Text>
      </Flex>
    </Card>
  )
}

export const Desktop = Template.bind({})
Desktop.args = {}