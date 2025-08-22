import { useTranslation } from 'react-i18next'

export function useTranslationPage() {
  const { t } = useTranslation('accounts')

  return t
}
