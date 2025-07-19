import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'

export function useNavigateHome() {
  const navigate = useNavigate()

  return () => navigate(ROUTES.ACCOUNTS)
}
