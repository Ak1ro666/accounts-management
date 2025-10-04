import { lazy, Suspense } from 'react'

import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/platform/routes'
import { appSessionStore } from '@/platform/session'

const SignUpForm = lazy(() =>
  import('auth/module').then((module) => ({ default: module.SignUpForm }))
)

function Page() {
  const navigate = useNavigate()

  appSessionStore.updateSessionStream.useEvent((event) => {
    if (event.type === 'update') {
      navigate(ROUTES.ACCOUNTS)
    }
  })

  return (
    <Suspense fallback='loading...'>
      <SignUpForm />
    </Suspense>
  )
}

export const Component = Page
