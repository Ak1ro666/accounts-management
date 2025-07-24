import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

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
