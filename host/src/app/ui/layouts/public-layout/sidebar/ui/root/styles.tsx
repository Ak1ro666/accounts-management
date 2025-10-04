import { useTheme } from '@mui/material'

export function useStyles() {
  const theme = useTheme()

  return {
    theme
  } as const
}
