import { redirect } from 'react-router-dom'

import { ROUTES } from '@/platform/routes'
import { appSessionStore } from '@/platform/session'

export function authLoader() {
  const token = appSessionStore.getSessionToken()

  if (token) {
    return redirect(ROUTES.ACCOUNTS)
  }

  return null
}
