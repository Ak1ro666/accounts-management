import type { ReactNode } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { accountsApi, AccountsApiContext } from '@/kernel/api/accounts'

import { ComposeChildren } from '@/shared/lib/react/compose-children'
import { themeConfig } from '@/shared/model/theme-config'
import { UiConfirmation } from '@/shared/ui/kit/confirmation'
import { WysiwygProvider } from '@/shared/ui/kit/wysiwyg-editor'

import { ErrorBoundary } from '../shared/lib/react/error-boundary'

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
