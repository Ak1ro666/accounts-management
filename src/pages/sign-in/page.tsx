import { useEffect } from 'react'

import { SignInForm } from '@/features/auth'

function Page() {
  useEffect(() => {
    import('@/pages/accounts/page') // prefetching
  }, [])

  return <SignInForm />
}

export const Component = Page
