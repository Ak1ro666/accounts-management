import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { SignInForm } from '@/features/auth'

function Page() {
  useTranslation('accounts')
  useEffect(() => {
    import('@/pages/accounts/page') // prefetching
  }, [])

  return <SignInForm />
}

export const Component = Page
