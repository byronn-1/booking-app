# Design System

Ovalhub uses the library `Chakra UI`, a global design system library to drive the look and feel on the application. This allows us to provide a centralised set of theming choices that can be spread globally and changed quickly without going back through every component.

## Chakra Components

Chakra comes with a good amount of preset components that we can leverage as needed. We handle and compose these in two ways:

1. Extending its default theme (i.e `<Text>`) and adding in our flavour of styling. This means that whenever a generic `<Text>` component is used, it'll use our stylings as default

2. Overriding a component - we create a brand new component (i.e `<CustomText>`) which will use the Chakra component by default, and then we apply stylings, props etc alongside for more customisation.

### Chakra Multi-Components

When styling multi-components the component style name can be found in the [chakra-ui packages/components](https://github.com/chakra-ui/chakra-ui/tree/main/packages/components) github repo. 
e.g. when styling a popover:

content refers to the popover container
header => header container
closButton => close button for the popover

when styling a card:
container refers to the card container
header => header
# Storybook

We use storybook as part of the development process to help visualise how a component will look and function. This can be shown in isolatinon to help test edge cases, and avoid needing to hijack an existing page.

This library also helps us create a one-stop knowledge base for all core and extended components we have created.

# Folder

The `_theme` folder is where all the global specifications for Chakra exist. from here we inject the final `index.js` into the `<ChakraProvider>` context found inside `App.js`

# Iconography

We use both Chakra's provided set of icons, as well as using various icons from the `react-icons` library.
