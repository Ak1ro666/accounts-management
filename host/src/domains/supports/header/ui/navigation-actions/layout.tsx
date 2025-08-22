import { Button } from '@mui/material'

export function Layout({
  logout,
  disabled
}: {
  logout: () => void
  disabled?: boolean
}) {
  return (
    <Button
      variant='contained'
      size='small'
      onClick={logout}
      disabled={disabled}>
      Выйти
    </Button>
  )
}
