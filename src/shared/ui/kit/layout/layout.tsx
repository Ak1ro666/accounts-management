import { ReactNode } from 'react'
import { Container } from '@mui/material'

export function Layout({
  children,
  topLayout
}: {
  children: ReactNode
  topLayout?: ReactNode
}) {
  return (
    <>
      {topLayout}
      <Container
        maxWidth='xl'
        sx={{ display: 'flex', gap: 2, my: 4, height: '100%' }}>
        {children}
      </Container>
    </>
  )
}
