import { createBrowserRouter, redirect } from 'react-router-dom'

import { PdfExportButton } from '@/features/document-flow'
import { AppHeader } from '@/features/header'

import { ROUTES } from '@/kernel/routes'

import { Layout } from '@/shared/ui/kit/layout'

import { App } from './app'
import { authLoader } from './model/auth-loader'
import { protectedLoader } from './model/protected-loader'
import { ProtectedRoute } from './model/protected-router'
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

updateSessionStream(router)
