import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

export function ErrorComponent() {
  const { t } = useTranslation()

  const reload = () => {
    location.reload()
  }

  return (
    <Box>
      <Box component='h1'>{t('error.errorOccurred')}</Box>
      <Button onClick={reload}>{t('error.reloadPage')}</Button>
    </Box>
  )
}
