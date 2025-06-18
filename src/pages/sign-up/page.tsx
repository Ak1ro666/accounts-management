import { useNavigate } from 'react-router-dom'

import { SignUpForm } from '@/features/auth'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

function Page() {
  const navigate = useNavigate()

  appSessionStore.updateSessionStream.useEvent(event => {
    if (event.type === 'update') {
      navigate(ROUTES.ACCOUNTS)
    }
  })

  return <SignUpForm />
}

export const Component = Page
