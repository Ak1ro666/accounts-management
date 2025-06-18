export const API_URL = {
  ACCOUNTS: `/accounts`,
  ACCOUNTS_FOR_ID: '/accounts/:accountId',
  ACCOUNTS_STATUS: '/accounts/:id/status',
  ACCOUNTS_CHARGES: '/accounts/:id/charges',
  ACCOUNTS_PAYMENTS: '/accounts/:id/payments'
} as const
