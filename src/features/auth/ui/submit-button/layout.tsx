import { ReactNode } from 'react'
import { Button } from '@mui/material'

export function Layout({
  children,
  onClick
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <Button
      type='submit'
      variant='contained'
      fullWidth
      size='large'
      sx={{ mb: 2, py: 1.5 }}
      onClick={onClick}>
      {children}
    </Button>
  )
}
