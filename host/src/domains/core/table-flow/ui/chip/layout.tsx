import { Chip } from '@mui/material'

import { type AccountStatus } from '@/kernel(platform)/account'

import { getStatusConfig } from '../../domain/table'

export function Layout({ status }: { status: AccountStatus }) {
  const { label, color } = getStatusConfig(status)

  return (
    <Chip
      label={label}
      color={color}
      size='small'
    />
  )
}
