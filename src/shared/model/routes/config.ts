export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  ACCOUNTS: '/accounts',
  RESENT_ACCOUNTS: '/accounts/recent',
  ACCOUNT: '/account/:id',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  NOT_FOUND: '*'
} as const

export type PathParams = {
  [ROUTES.ACCOUNT]: {
    id: string
  }
}

declare module 'react-router-dom' {
  interface Register {
    params: PathParams
  }
}
