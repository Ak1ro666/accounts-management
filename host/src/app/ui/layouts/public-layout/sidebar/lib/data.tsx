import { AccessTime, AccountBalance } from '@mui/icons-material'

import { ROUTES } from '@/platform/routes'

export const NAV_ITEMS = [
  {
    path: ROUTES.ACCOUNTS,
    icon: <AccountBalance />,
    label: 'Все аккаунты'
  },
  {
    path: ROUTES.RESENT_ACCOUNTS,
    icon: <AccessTime fontSize='small' />,
    label: 'Недавние'
  }
]
