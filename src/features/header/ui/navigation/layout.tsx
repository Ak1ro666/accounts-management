import { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

export function Layout({
  actions,
  email
}: {
  actions?: ReactNode
  email?: string
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography
        variant='body2'
        color='text.secondary'>
        {email}
      </Typography>
      {actions}
    </Box>
  )
}
