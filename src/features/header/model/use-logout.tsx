import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

export function useLogout() {
  const navigate = useNavigate()

  const logout = () => {
    navigate(ROUTES.SIGN_IN)
    appSessionStore.removeSessionToken()
  }

  return logout
}
