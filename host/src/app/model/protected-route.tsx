import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/platform/routes'
import { appSessionStore } from '@/platform/session'

export function ProtectedRoute() {
  const isSessionExpired = appSessionStore.isSessionExpired()

  if (isSessionExpired) {
    return (
      <Navigate
        to={ROUTES.SIGN_IN}
        replace
      />
    )
  }

  return <Outlet />
}
