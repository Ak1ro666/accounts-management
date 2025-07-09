import { createTheme } from '@mui/material'

export const themeConfig = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: ownerState.disabled ? 'grey' : undefined
        })
      }
    }
  },
  palette: {
    primary: {
      // main: "#ca0000",
      main: '#2962ff'
    },
    secondary: {
      // main: "#2e4c9b",
      main: '#2962ff'
    }
  }
})
