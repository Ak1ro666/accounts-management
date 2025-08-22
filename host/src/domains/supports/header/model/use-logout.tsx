import { useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/platform/routes'
import { appSessionStore } from '@/platform/session'

export function useLogout() {
  const navigate = useNavigate()
  const [isTransitioning, startTransition] = useTransition()

  const logout = () => {
    startTransition(() => {
      navigate(ROUTES.SIGN_IN)
      appSessionStore.removeSession()
    })
  }

  return [isTransitioning, logout] as const
}
