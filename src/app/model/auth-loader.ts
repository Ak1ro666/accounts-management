import { redirect } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

export function authLoader() {
  const token = appSessionStore.getSessionToken()

  if (token) {
    return redirect(ROUTES.ACCOUNTS)
  }

  return null
}
