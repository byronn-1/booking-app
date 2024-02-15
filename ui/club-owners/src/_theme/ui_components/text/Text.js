export const Text = {
  styles: {
    global: {
        'html, body, text': {
            color: 'yellow',
            lineHeight: 'tall',
        }
    },
},
    baseStyle: {
        color: 'base.font',
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
          fontSize: '38px',
          px: '36px',
          py: '40px'
      },
      icon: {
        px: '0px',
        py: '0px'
      }
    },
    variants: {},
    defaultProps: {
        size: '',
        variant: '',
        colorScheme: '',
      },
}