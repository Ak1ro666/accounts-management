import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

import '@/platform/model/i18n/i18n'

const mode = process.env.NODE_ENV

export async function enableServieWorker() {
  if (mode === 'development' && 'serviceWorker' in navigator) {
    const swPath = '../../src/app/model/service-worker.ts'
    return navigator.serviceWorker
      .register(swPath)
      .then(console.log)
      .catch(() =>
        console.error(`Service worker register fail by path ${swPath}`)
      )
  }
}

enableServieWorker().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})
