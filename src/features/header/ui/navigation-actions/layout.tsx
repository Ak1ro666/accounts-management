import { Button } from '@mui/material'

export function Layout({ logout }: { logout: () => void }) {
  return (
    <Button
      variant='contained'
      size='small'
      onClick={logout}>
      Выйти
    </Button>
  )
}
