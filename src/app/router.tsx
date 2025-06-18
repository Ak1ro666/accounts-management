import { createBrowserRouter, redirect } from 'react-router-dom'

import { AppHeader } from '@/features/header'

import { ROUTES } from '@/shared/model/routes'
import { appSessionStore } from '@/shared/model/session'

import { App } from './app'
import { authLoader } from './model/auth-loader'
import { protectedLoader } from './model/protected-loader'
import { ProtectedRoute } from './model/protected-router'
import { Providers } from './providers'
import { LangSwitcher } from './ui/lang-switcher'
import { PageLayout } from './ui/page-layout'
import { Sidebar } from './ui/sidebar'

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <PageLayout>
              <Sidebar switchers={<LangSwitcher />} />
              <ProtectedRoute />
            </PageLayout>
          </>
        ),
        children: [
          {
            path: ROUTES.ACCOUNTS,
            lazy: () => import('@/pages/accounts/page')
          },
          {
            path: ROUTES.RESENT_ACCOUNTS,
            lazy: () => import('@/pages/recent-accounts/page')
          }
        ]
      },
      {
        loader: authLoader,
        children: [
          {
            path: ROUTES.SIGN_IN,
            lazy: () => import('@/pages/sign-in/page')
          },
          {
            path: ROUTES.SIGN_UP,
            lazy: () => import('@/pages/sign-up/page')
          }
        ]
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.ACCOUNTS)
      },
      {
        path: ROUTES.NOT_FOUND,
        lazy: () => import('@/pages/not-found/page')
      }
    ]
  }
])

appSessionStore.updateSessionStream.listen(event => {
  if (event.type === 'remove') {
    router.navigate(ROUTES.SIGN_IN)
  }
})
