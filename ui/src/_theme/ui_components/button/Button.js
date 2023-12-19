export const Button = {
  baseStyle: {
    fontWeight: 'bold',
    fontFamily: 'heading',
    borderRadius: '17px',
    borderWidth: '2px',
    borderColor: 'base.btnBorder',
    textTransform: 'capitalize',
    outline: 'none',
    bgColor: 'base.button',
    color: 'base.fontWhite',
    cursor: 'pointer',
    _hover:{
    bgColor: 'base.buttonHover',
    },
    _active: {
      // bgColor: 'base.buttonActive',
      border: '2px',
      borderColor: 'base.white'
    }
  },
  sizes: {
    sm: {
      fontSize: '12px',
      px: '6px',
      py: '8px'
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
    variant: 'primary'
  }
};
