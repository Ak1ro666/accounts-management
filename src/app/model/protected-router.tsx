import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

export function ProtectedRoute() {
  const session = appSessionStore.getSession()

  if (!session) {
    return <Navigate to={ROUTES.SIGN_IN} />
  }

  return <Outlet />
}
