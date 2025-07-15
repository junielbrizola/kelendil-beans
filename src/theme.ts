import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { amber, grey, green, red, blue } from '@mui/material/colors';

export const theme = responsiveFontSizes(createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  palette: {
    primary: {
      light: '#8D6E63',
      main:  '#6D4C41',
      dark:  '#5D4037',
      contrastText: '#fff'
    },
    secondary: {
      light: '#FF8A65',
      main:  '#D2691E',
      dark:  '#BF360C',
      contrastText: '#fff'
    },
    error:   { main: red[700] },
    warning: { main: amber[700] },
    info:    { main: blue[600] },
    success: { main: green[600] },
    background: {
      default: '#FAF5F0',
      paper:   '#FFFFFF'
    },
    text: {
      primary:   grey[900],
      secondary: grey[700]
    },
    divider: grey[200]
  },
  typography: {
    fontFamily:        'var(--font-body), sans-serif',
    fontSize:          14,
    h1:                { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '3rem', lineHeight: 1.2 },
    h2:                { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.3 },
    h3:                { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '2rem', lineHeight: 1.4 },
    h4:                { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.75rem', lineHeight: 1.4 },
    h5:                { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.5 },
    h6:                { fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.6 },
    subtitle1:         { fontSize: '1rem', fontWeight: 500 },
    subtitle2:         { fontSize: '0.875rem', fontWeight: 500 },
    body1:             { fontSize: '1rem', lineHeight: 1.5 },
    body2:             { fontSize: '0.875rem', lineHeight: 1.43 },
    button:            { fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'none' },
    caption:           { fontSize: '0.75rem' },
    overline:          { fontSize: '0.625rem', textTransform: 'uppercase', fontWeight: 500 }
  },
  spacing: 4,       
  shape: {
    borderRadius: 8 
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--spacing-unit': '4px'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          padding: '8px 16px'
        }
      }
    },
    MuiCard: {
      defaultProps: { elevation: 2 },
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: grey[900]
        }
      }
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: grey[800] }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: { color: grey[600] }
      }
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 4
        }
      }
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: '#6D4C41'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6
        }
      }
    }
  }
}));

