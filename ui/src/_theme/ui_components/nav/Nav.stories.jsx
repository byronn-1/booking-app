import React from 'react';
import Nav from './Nav';

export default {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen'
  }
};

const Template = (args) => <Nav {...args} />;

export const Desktop = Template.bind({});
Desktop.args = {};

export const Tablet = Template.bind({});
Tablet.parameters = {
  viewport: {
    defaultViewport: 'tabletLandscape'
  }
};

export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};
