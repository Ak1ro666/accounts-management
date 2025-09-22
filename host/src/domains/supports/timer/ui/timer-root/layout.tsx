import { ReactNode } from 'react'
import { Alert, Box, Typography } from '@mui/material'

export function Layout({
  viewTime,
  actions,
  timeLeft
}: {
  viewTime: ReactNode
  actions: ReactNode
  timeLeft: number
}) {
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography
        variant='h5'
        component='h2'
        gutterBottom>
        Wrong Countdown Implementation
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2.5
        }}>
        {viewTime}

        <Box sx={{ display: 'flex', gap: 1.5 }}>{actions}</Box>

        {timeLeft === 0 && (
          <Alert
            severity='error'
            sx={{ width: '100%', fontWeight: 'bold' }}>
            Time's up!
          </Alert>
        )}
      </Box>
    </Box>
  )
}
