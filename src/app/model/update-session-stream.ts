import { createBrowserRouter } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

import { MyReturnType } from '@/shared/lib/typescript'

export function updateSessionStream(
  router: MyReturnType<typeof createBrowserRouter>
) {
  appSessionStore.updateSessionStream.listen((event) => {
    if (event.type === 'remove') {
      router.navigate(ROUTES.SIGN_IN)
    }
  })
}
