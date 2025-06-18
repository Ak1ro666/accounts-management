import type { ReactNode } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { accountsApi, AccountsApiContext } from '@/kernel/api/accounts'

import { ComposeChildren } from '@/shared/lib/react/compose-children'
import { themeConfig } from '@/shared/model/theme-config'
import { UiConfirmation } from '@/shared/ui/kit/confirmation'

import { ErrorBoundary } from './error-boundary'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider theme={themeConfig} />
      <CssBaseline />
      <UiConfirmation />
      <AccountsApiContext.Provider value={accountsApi} />
      <ErrorBoundary />
      {children}
    </ComposeChildren>
  )
}
