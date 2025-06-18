import type { ReactNode } from 'react'

import { Container } from '@mui/material'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Container
      maxWidth='xl'
      sx={{ display: 'flex', gap: 2, my: 4, height: '100%' }}>
      {children}
    </Container>
  )
}
