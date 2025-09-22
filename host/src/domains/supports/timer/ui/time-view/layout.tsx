import { ReactNode } from 'react'
import { Typography } from '@mui/material'

export function Layout({
  timeLeft,
  content
}: {
  timeLeft: number
  content: ReactNode
}) {
  return (
    <Typography
      sx={{
        fontSize: '48px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: timeLeft <= 10 ? 'error.main' : 'text.primary'
      }}>
      {content}
    </Typography>
  )
}
