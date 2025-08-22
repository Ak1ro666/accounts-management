import { ReactNode } from 'react'
import { Container, List, Paper } from '@mui/material'

export function Layout({
  arrows,
  content,
  centerActionsPannel
}: {
  arrows: ReactNode
  content: ReactNode
  centerActionsPannel: ReactNode
}) {
  return (
    <Container
      maxWidth='xs'
      sx={{ mt: 4 }}>
      <Paper
        elevation={3}
        sx={{ p: 3 }}>
        <svg
          style={{
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            width: '100%',
            height: '100%'
          }}>
          {arrows}
        </svg>
        {content}
        <List sx={{ ml: 'auto' }}>{centerActionsPannel}</List>
      </Paper>
    </Container>
  )
}
