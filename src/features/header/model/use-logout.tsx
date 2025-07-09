import { useTransition } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

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
