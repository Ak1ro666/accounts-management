import { Button } from '@mui/material'

export function Layout({
  onNavigationRequested
}: {
  onNavigationRequested: () => void
}) {
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onNavigationRequested}
      sx={{ mt: 2 }}>
      Вернуться на главную
    </Button>
  )
}
