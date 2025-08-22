import { MouseEventHandler, ReactNode } from 'react'
import { Button } from '@mui/material'

export function Layout({
  startIcon,
  onClick,
  children,
  color = 'success'
}: {
  startIcon: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  color?: 'success' | 'warning' | 'error'
}) {
  return (
    <Button
      variant='contained'
      color={color}
      startIcon={startIcon}
      onClick={onClick}
      sx={{ px: 2, py: 1 }}>
      {children}
    </Button>
  )
}
