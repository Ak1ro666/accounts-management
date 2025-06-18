import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

export function useUpdateSession() {
  const navigate = useNavigate()

  appSessionStore.updateSessionStream.useEvent(event => {
    if (event.type === 'update') {
      navigate(ROUTES.ACCOUNTS)
    }
  })
}
