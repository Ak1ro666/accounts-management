import { ReactNode } from 'react'
import { Box } from '@mui/material'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {children}
    </Box>
  )
}
