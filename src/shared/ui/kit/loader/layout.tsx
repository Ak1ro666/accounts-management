import type { SxProps, Theme } from '@mui/material'

import { Box, CircularProgress } from '@mui/material'

export function Layout({ styles }: { styles?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...styles
      }}>
      <CircularProgress size={24} />
    </Box>
  )
}
