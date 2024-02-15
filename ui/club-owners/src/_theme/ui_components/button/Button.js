export const Button = {
  baseStyle: {
    fontWeight: 'bold',
    fontFamily: 'heading',
    borderRadius: '10px',
    borderWidth: '0px',
    borderColor: 'base.btnBorder',
    textTransform: 'capitalize',
    outline: 'none',
    bgColor: 'base.button',
    color: 'base.fontWhite',
    cursor: 'pointer',
    _hover: {
      bgColor: 'base.buttonHover',
    },
    _active: {
      border: '2px',
      borderColor: 'base.white'
    }
  },
  sizes: {
    xs: {
      borderRadius: '2px',
      px: '4px',
      py: '4px',
      fontSize: '12px',
      height: '17px'
    },
    sm: {
      fontSize: '12px',
      px: '4px',
      py: '3px',
      borderRadius: '3px',
      height: '20px',

    },
    md: {
      fontSize: '16px',
      px: '12px',
      py: '16px'
    },
    lg: {
      fontSize: '18px',
      px: '16px',
      py: '20px'
    },
    xl: {
      fontSize: '20px',
      px: '18px',
      py: '22px'
    },
    icon: {
      px: '0px',
      py: '0px'
    }
  },
  variants: {
    primary: {
      // bgColor: 'base.brand',
      borderColor: 'base.fontWhite',
      /*  _hover: {
         bgColor: 'base.fontWhite',
         border: '2px',
         borderColor: 'base.black'
       },
       _active: {
         bg: 'base.a'
       } */
    },
    whiteBg: {
      borderColor: 'base.button',
      fontWeight: 'bold',
      bgColor: 'base.white',
      color: 'base.button',
      cursor: 'pointer',
      borderWidth: '1px',
      _active: {
        border: '2px',
        borderColor: 'base.white',
        bgColor: 'base.buttonActive',
        color: 'base.fontWhite',
      },
      _hover: {
        bgColor: 'base.buttonHover',
        color: 'base.fontWhite',
      },
    },
    alternate: {
      bg: 'alternate.background',
      _hover: {
        bg: 'alternate.hover'
      },
      _active: {
        bg: 'alternate.active'
      }
    },
    dropdown: {
      bg: 'base.background',
      maxW: '200px',
      _hover: {
        bg: 'base.hover'
      },
      _active: {
        bg: 'base.active'
      }
    },
    icon: {
      border: 'none'
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'whiteBg'
  }
};
