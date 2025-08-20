import { ReactNode } from 'react'
import { Button } from '@mui/material'

export function Layout({
  onClick,
  disabled,
  content,
  error
}: {
  onClick: () => void
  disabled: boolean
  content: ReactNode
  error?: string
}) {
  return (
    <>
      <Button
        variant='contained'
        onClick={onClick}
        disabled={disabled}>
        {content}
      </Button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </>
  )
}
