import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/platform/routes'

export function useNavigateHome() {
  const navigate = useNavigate()

  return () => navigate(ROUTES.SIGN_IN)
}
