import { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useRole, UserRole } from '@/kernel/authorization'
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

export function ProtectedRolesRoute({
  roles,
  children
}: {
  roles: UserRole[]
  children: ReactNode
}) {
  const role = useRole()

  if (roles.includes(role)) {
    return children
  }

  return (
    <Navigate
      to={ROUTES.FORBIDEN}
      replace
    />
  )
}
