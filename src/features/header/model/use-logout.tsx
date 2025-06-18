import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

export function useLogout() {
  const navigate = useNavigate()

  const logout = () => {
    navigate(ROUTES.SIGN_IN)
    appSessionStore.removeSessionToken()
  }

  return logout
}
