import { createMultiStyleConfigHelpers} from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers([ 'container', 'header',  'body' ]);

export const Modal = helpers.defineMultiStyleConfig({
  baseStyle: {
    container: {
      borderColor: "base.border",
      borderWidth: "1px",
      borderRadius: "5px",
      flexDirection: 'column',
      boxShadow: 'base.border',
      maxW: '500px'
    },
    dialogContainer:{
    },
    dialog:{
        bgColor: "base.background",
        color: 'base.font',
    },
    body:{
        bgColor: "base.background",
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
      bgColor: "base.white",
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
