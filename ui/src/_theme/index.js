import { extendTheme } from '@chakra-ui/react';
import * as foundations from './foundations/index.js';
import * as components from './ui_components/index.js';


/* const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};
 */
const theme = extendTheme({
  
  ...foundations,
  components: {
    ...components
  }
});

export default theme;
