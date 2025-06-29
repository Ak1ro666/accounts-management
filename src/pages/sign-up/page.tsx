import { useNavigate } from 'react-router-dom'

import { SignUpForm } from '@/features/auth'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

function Page() {
  const navigate = useNavigate()

  appSessionStore.updateSessionStream.useEvent((event) => {
    if (event.type === 'update') {
      navigate(ROUTES.ACCOUNTS)
    }
  })

  return <SignUpForm />
}

export const Component = Page
