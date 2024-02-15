export const Tabs = {
  baseStyle: {
    tab: {
      fontFamily: 'heading',
      color: 'base.font',
      _selected: {
        fontWeight: 'bold',
        color: 'base.font'
      },
      _unselected: {
        color: 'base.border'
      }
    }
  },
  sizes: {},
  variants: {
    line: {
      tab: {
        _selected: {
          fontWeight: 'bold',
          color: 'base.text'
        },
        _unselected: {
          color: 'base.border'
        }
      },
      tabpanel: {
        p: '0px'
      }
    }
  },
  defaultProps: {
    variant: ''
  }
};
