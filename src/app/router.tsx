import { createBrowserRouter, redirect } from 'react-router-dom'

import { AppHeader } from '@/features/header'

import { UserRole } from '@/kernel/authorization'
import { ROUTES } from '@/kernel/routes'

import { App } from './app'
import { authLoader } from './model/auth-loader'
import { protectedLoader, protectedRolesLoader } from './model/protected-loader'
import { ProtectedRoute } from './model/protected-route'
import { updateSessionStream } from './model/update-session-stream'
import { Providers } from './providers'
import { AppLayout } from './ui/layouts/app-layout'
import { Sidebar } from './ui/layouts/public-layout/sidebar'

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
            lazy: () => import('@/pages/accounts/page')
          },
          {
            path: ROUTES.RESENT_ACCOUNTS,
            loader: protectedRolesLoader([UserRole.VIEWER]),
            lazy: () => import('@/pages/accounts-recent/page')
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
        path: ROUTES.FORBIDEN,
        lazy: () => import('@/pages/forbiden/page')
      },
      {
        path: ROUTES.NOT_FOUND,
        lazy: () => import('@/pages/not-found/page')
      }
    ]
  }
])

updateSessionStream(router)
