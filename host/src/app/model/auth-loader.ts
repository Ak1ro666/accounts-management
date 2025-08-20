import { redirect } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

export function authLoader() {
  const token = appSessionStore.getSessionToken()

  if (token) {
    return redirect(ROUTES.ACCOUNTS)
  }

  return null
}
