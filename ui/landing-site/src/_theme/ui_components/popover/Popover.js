import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(['content', 'header', 'body', 'closeButton', 'arrow']);

export const Popover = helpers.defineMultiStyleConfig({
  baseStyle: {
    content: {
      bg: 'base.nav',
      borderColor: 'base.font',
      borderRadius: "6px",
      borderWidth: 2,
    },
    header: {
      color: 'base.font',
      fontFamily: 'fonts.heading',
      fontWeight: 'bold',
    },
    body: {
      color: 'base.font',
      textAlign: 'centre',
      fontFamily: 'fonts.body',
      fontWeight: 'normal',
      textTransform: 'none',
    },
    closeButton: {
      stroke: 'base.brand',
      strokeWidth: 4,
      fill: 'base.brand'
    },
    arrow: {
      color: '#EFEFFF',
    },
  },
  sizes: {},
  variants: {
    ovalhub: {
      
    }
  },
  defaultProps: {}
});
