import { redirect } from 'react-router-dom'

import { UserRole } from '@/kernel/authorization'
import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

export async function protectedLoader() {
  if (appSessionStore.isSessionExpired()) {
    const newToken = await appSessionStore.getRefreshToken()
    if (newToken === null) {
      return redirect(ROUTES.SIGN_IN)
    }
  }

  return null
}

export function protectedRolesLoader(roles: UserRole[]) {
  return async () => {
    const role = appSessionStore.getSession()?.role

    if (role && roles.includes(role)) {
      return null
    }

    return redirect(ROUTES.FORBIDEN)
  }
}
