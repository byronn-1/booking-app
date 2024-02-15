import { createMultiStyleConfigHelpers} from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers([ 'container', 'header',  'body' ]);

export const Card = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      borderColor: "base.border",
      borderWidth: "1px",
      borderRadius: "5px",
      flexDirection: 'column',
      boxShadow: 'base.border',
      maxW: '500px'
    },
    header: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      bgColor: "base.card",
      justifyContent: 'space-between',
      borderBottomWidth: "1px",
      p: '10px',
      fontSize: 'lg',
      fontWeight: 'bold',
      color: 'base.font',
      borderColor: "base.border",
      borderTopRadius: '5px',
      textTransform: 'capitalize',
      
    },
    body: {
      bgColor: "base.card",
      borderColor: "base.border",
      pt: '5px',
      pb: '5px',
      borderBottomRadius: '5px',
      justifyContent: 'center',
    },
  },
sizes: {
  },
  variants: {
  },
  defaultProps: {}
});
