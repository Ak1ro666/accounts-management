import { ReactNode } from 'react'
import { Box, Container } from '@mui/material'

export function Layout({
  children,
  topLayout
}: {
  children: ReactNode
  topLayout?: ReactNode
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflowY: 'hidden'
      }}>
      {topLayout}
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          gap: 2,
          my: 4,
          flexGrow1: 1,
          justifyContent: 'center',
          height: '100%'
        }}>
        {children}
      </Container>
    </Box>
  )
}
