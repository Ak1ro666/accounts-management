import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'

export function Layout({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<Add />}
      onClick={onClick}>
      Создать счет
    </Button>
  )
}
