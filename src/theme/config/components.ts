export const components = {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          [`::before`]: {
            width: '0%',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        readOnly: {
          [`::before`]: {
            display: 'none',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '10px 0px 0px 10px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          ['.MuiDataGrid-iconSeparator']: {
            color: 'transparent',
          },
        },
        columnHeaderRow: {
          color: '#fff',
          background: '#053747',
        },
        virtualScroller: {
          background: '#ffffff',
        },
        columnHeaderTitle: {
          fontWeight: 900,
          fontSize: '16px',
        },
        menuIcon: {
          ['.MuiSvgIcon-fontSizeSmall']: {
            color: 'rgba(255,255,255, 0.5) !important',
          },
        },
        iconButtonContainer: {
          ['.MuiIconButton-sizeSmall']: {
            color: 'rgba(255,255,255, 0.5) !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          ['.MuiSvgIcon-root']: {
            verticalAlign: 'inherit',
            fontSize: '15px',
          },
        },
      },
    },  

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      },
    },
  }