import { ReactNode } from 'react'
import { Lock as LockIcon } from '@mui/icons-material'
import { Box, Container, Typography } from '@mui/material'

export function Layout({
  title,
  description,
  actions
}: {
  title: ReactNode
  description: ReactNode
  actions: ReactNode
}) {
  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
        <LockIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography
          component='h1'
          variant='h3'
          gutterBottom>
          {title}
        </Typography>
        <Typography
          variant='body1'
          sx={{ mb: 3 }}>
          {description}
        </Typography>
        {actions}
      </Box>
    </Container>
  )
}
