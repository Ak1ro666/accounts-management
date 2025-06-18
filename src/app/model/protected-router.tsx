import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

export function ProtectedRoute() {
  const session = appSessionStore.getSession()

  if (!session) {
    return <Navigate to={ROUTES.SIGN_IN} />
  }

  return <Outlet />
}
