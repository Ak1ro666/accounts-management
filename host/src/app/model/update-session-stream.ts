import { createBrowserRouter } from 'react-router-dom'

import { MyReturnType } from '@/platform/lib/typescript'
import { ROUTES } from '@/platform/routes'
import { appSessionStore } from '@/platform/session'

export function updateSessionStream(
  router: MyReturnType<typeof createBrowserRouter>
) {
  appSessionStore.updateSessionStream.listen((event) => {
    if (event.type === 'remove') {
      router.navigate(ROUTES.SIGN_IN)
    }
  })
}
