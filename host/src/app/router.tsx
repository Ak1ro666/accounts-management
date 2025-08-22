import { createBrowserRouter, redirect } from 'react-router-dom'

import { UserRole } from '@/domains/supports/authorization'
import { ROUTES } from '@/platform/routes'

import { App } from './app'
import { authLoader } from './model/auth-loader'
import { protectedLoader, protectedRolesLoader } from './model/protected-loader'
import { ProtectedRoute } from './model/protected-route'
import { updateSessionStream } from './model/update-session-stream'
import { Providers } from './providers'
import { AppLayout } from './ui/layouts/app-layout'
import { Sidebar } from './ui/layouts/public-layout/sidebar'

import { AppHeader } from '@/domains/supports/header'

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.ROOT,
        loader: () => redirect(ROUTES.ACCOUNTS)
      },
      {
        loader: protectedLoader,
        element: (
          <AppLayout topLayout={<AppHeader />}>
            <Sidebar />
            <ProtectedRoute />
          </AppLayout>
        ),
        children: [
          {
            path: ROUTES.ACCOUNTS,
            loader: protectedRolesLoader([UserRole.VIEWER, UserRole.ADMIN]),
            lazy: () => import('@/app/pages/accounts/page')
          },
          {
            path: ROUTES.RESENT_ACCOUNTS,
            loader: protectedRolesLoader([UserRole.VIEWER]),
            lazy: () => import('@/app/pages/accounts-recent/page')
          }
        ]
      },
      {
        path: ROUTES.DIAGRAM,
        lazy: () => import('@/app/pages/diagram/page')
      },
      {
        loader: authLoader,
        children: [
          {
            path: ROUTES.SIGN_IN,
            lazy: () => import('auth/module')
          },
          {
            path: ROUTES.SIGN_UP,
            lazy: () => import('@/app/pages/sign-up/page')
          }
        ]
      },
      {
        path: ROUTES.FORBIDEN,
        lazy: () => import('@/app/pages/forbiden/page')
      },
      {
        path: ROUTES.NOT_FOUND,
        lazy: () => import('@/app/pages/not-found/page')
      }
    ]
  }
])

updateSessionStream(router)
