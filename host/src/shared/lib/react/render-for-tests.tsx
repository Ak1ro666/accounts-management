import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'

import i18nForTest from '@/shared/model/i18n/i18n-test'

export function renderForTests(component: ReactNode) {
  return render(
    <I18nextProvider i18n={i18nForTest}>
      <BrowserRouter>{component}</BrowserRouter>
    </I18nextProvider>
  )
}
