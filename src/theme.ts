// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { PaletteMode, ThemeOptions } from '@mui/material';
import { amber, deepOrange, grey, green, red, blue } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      light: mode === 'light' ? '#8D6E63' : '#5D4037',
      main:  '#6D4C41',
      dark:  mode === 'light' ? '#5D4037' : '#3E2723',
      contrastText: '#fff'
    },
    secondary: {
      light: mode === 'light' ? '#FF8A65' : '#D84315',
      main:  '#D2691E',
      dark:  mode === 'light' ? '#BF360C' : '#BF360C',
      contrastText: '#fff'
    },
    error:   { main: red[700] },
    warning: { main: amber[700] },
    info:    { main: blue[600] },
    success: { main: green[600] },
    background: {
      default: mode === 'light' ? '#FAF5F0' : '#121212',
      paper:   mode === 'light' ? '#FFFFFF' : '#1E1E1E'
    },
    text: {
      primary:   mode === 'light' ? grey[900] : '#fff',
      secondary: mode === 'light' ? grey[700] : grey[400]
    },
    divider: mode === 'light' ? grey[200] : grey[700]
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
  spacing: 4,       // spacing(1) === 4px, spacing(2) === 8px, etc.
  shape: {
    borderRadius: 8 // padrão arredondado
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
          backgroundColor: mode === 'light' ? '#fff' : '#1E1E1E',
          color: mode === 'light' ? grey[900] : '#fff'
        }
      }
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: { color: mode === 'light' ? grey[800] : grey[300] }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: { color: mode === 'light' ? grey[600] : grey[400] }
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
          color: mode === 'light' ? '#6D4C41' : '#D2691E'
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
    // …adicione overrides para outros componentes conforme necessidade
  }
});

export function getTheme(mode: PaletteMode) {
  return responsiveFontSizes(createTheme(getDesignTokens(mode)));
}
