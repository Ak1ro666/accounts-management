export const ROUTES = {
  ROOT: '/',
  ABOUT: '/about',
  DIAGRAM: '/diagram',
  ACCOUNTS: '/accounts',
  RESENT_ACCOUNTS: '/accounts/recent',
  ACCOUNT: '/account/:id',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  FORBIDEN: '/forbiden',
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
