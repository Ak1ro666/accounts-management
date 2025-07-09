import { redirect } from 'react-router-dom'

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
