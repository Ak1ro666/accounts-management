import type { ReactNode } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { accountsApi, AccountsApiContext } from '@/domains/contacts/accounts'

import { ComposeChildren } from '@/platform/lib/react/compose-children'
import { themeConfig } from '@/platform/model/theme-config'
import { UiConfirmation } from '@/platform/ui/confirmation'
import { WysiwygProvider } from '@/platform/ui/wysiwyg-editor'

import { ErrorBoundary } from '../platform/lib/react/error-boundary'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider theme={themeConfig} />
      <CssBaseline />
      <UiConfirmation />
      <AccountsApiContext.Provider value={accountsApi} />
      <WysiwygProvider />
      <ErrorBoundary />
      {children}
    </ComposeChildren>
  )
}
