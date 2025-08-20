import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/kernel/routes'
import { appSessionStore } from '@/kernel/session'

export function useUpdateSession() {
  const navigate = useNavigate()

  appSessionStore.updateSessionStream.useEvent((event) => {
    if (event.type === 'update') {
      navigate(ROUTES.ACCOUNTS)
    }
  })
}
