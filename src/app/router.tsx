import { createBrowserRouter, redirect } from 'react-router-dom'

import { AccountsRecentPage } from '@/pages/accounts-recent/page'

import { PdfExportButton } from '@/features/document-flow'
import { AppHeader } from '@/features/header'

import { UserRole } from '@/kernel/authorization'
import { ROUTES } from '@/kernel/routes'

import { Layout } from '@/shared/ui/kit/layout'

import { App } from './app'
import { authLoader } from './model/auth-loader'
import { protectedLoader } from './model/protected-loader'
import { ProtectedRolesRoute, ProtectedRoute } from './model/protected-route'
import { updateSessionStream } from './model/update-session-stream'
import { Providers } from './providers'
import { LangSwitcher } from './ui/lang-switcher'
import { LayoutSwitchers } from './ui/layout-switchers'
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
        path: ROUTES.ROOT,
        loader: () => redirect(ROUTES.ACCOUNTS)
      },
      {
        loader: protectedLoader,
        element: (
          <Layout topLayout={<AppHeader />}>
            <Sidebar
              switchers={
                <LayoutSwitchers>
                  <LangSwitcher />
                  <PdfExportButton
                    data={{
                      title: 'Мой отчет',
                      content:
                        'Это пример содержимого отчета, которое будет в PDF.'
                    }}
                  />
                </LayoutSwitchers>
              }
            />
            <ProtectedRoute />
          </Layout>
        ),
        children: [
          {
            path: ROUTES.ACCOUNTS,
            lazy: () => import('@/pages/accounts/page')
          },
          {
            path: ROUTES.RESENT_ACCOUNTS,
            element: (
              <ProtectedRolesRoute roles={[UserRole.VIEWER, UserRole.ADMIN]}>
                <AccountsRecentPage />
              </ProtectedRolesRoute>
            )
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
        path: ROUTES.NOT_FOUND,
        lazy: () => import('@/pages/not-found/page')
      }
    ]
  }
])

updateSessionStream(router)
