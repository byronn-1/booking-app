export const Input = {
  baseStyle: {
    field: {
      fontWeight: 600,
      fontFamily: 'font.heading',
      borderRadius: '10px',
      borderWidth: '2px',
      borderColor: '#092640',
      outline: 'none',
      color: 'base.black',
      colorScheme: 'none',
     
      _placeholder:{
        color:'base.black',
        opacity: 1,
        fontWeight:"light"
    } 
    }
  },
  sizes: {
    sm: {
      field: {
        fontSize: '12px',
        px: '6px',
        py: '8px',
        w: '100px',
        h: '40px',
        borderRadius: '6px'
      }
    },
    md: {
      field: {
        fontSize: '16px',
        px: '12px',
        py: '16px',
        w: '150px'
      }
    },
    lg: {
      field: {
        fontSize: '16px',
        px: '12px',
        py: '16px',
        w: '200px',
        h: '40px'
      }
    },
    xl: {
      field: {
        fontSize: '16px',
        px: '12px',
        py: '16px',
        w: '250px',
        h: '40px'
      }
    },
    search: {
      field: {
        fontSize: '12px',
        px: '6px',
        py: '8px',
        h: '30px'
      },
      element: {
        h: '30px'
      }
    },
    table: {
      field: {
        fontSize: '12px',
        px: '6px',
        py: '8px',
        h: '15px'
      }
    }
  },
  variants: {
    primary: {
      field: {
        bg: 'transparent',
        _hover: {
          // bg: 'base.hover',
          _placeholder: {color:'base.black'},
          // shadow:'inset 0 0 2px 2px #FFFFFF',
          borderColor: 'base.red',
        },
        _focus: {
          // bg: 'base.brand',
          color: 'base.black',
          fontFamily: 'fonts.heading',
          _placeholder: {color:'base.black'},
          shadow:'inset 0 0 2px 2px #FFFFFF',
          borderColor: 'base.black',
        },
        

      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'primary'
  }
};
