import type { ReactNode } from 'react'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { ErrorBoundary } from '../platform/lib/react/error-boundary'

import { accountsApi, accountsApiContext } from '@/domains/contacts/accounts'
import { fileStorageContext } from '@/domains/contacts/file-storage'
import { useStartOpenFileStorageModal } from '@/domains/core/manage-files-storage'
import { ComposeChildren } from '@/platform/lib/react/compose-children'
import { themeConfig } from '@/platform/model/theme-config'
import { UiConfirmation } from '@/platform/ui/confirmation'
import { WysiwygProvider } from '@/platform/ui/wysiwyg-editor'

export function Providers({ children }: { children: ReactNode }) {
  const startOpenFileStorageModal = useStartOpenFileStorageModal()

  return (
    <ComposeChildren>
      <ThemeProvider theme={themeConfig} />
      <CssBaseline />
      <UiConfirmation />
      <accountsApiContext.Provider value={accountsApi} />
      <fileStorageContext.Provider
        value={{ open: startOpenFileStorageModal }}
      />
      <WysiwygProvider />
      <ErrorBoundary />
      {children}
    </ComposeChildren>
  )
}
