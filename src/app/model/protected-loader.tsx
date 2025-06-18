import { redirect } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

export async function protectedLoader() {
  if (!appSessionStore.getSessionToken()) {
    return redirect(ROUTES.SIGN_IN)
  }

  return null
}
