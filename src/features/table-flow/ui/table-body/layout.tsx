import type { Account, AccountId, AccountStatus } from '@/kernel/account'
import type { ReactNode } from 'react'

import { MenuItem, Select, TableCell, TableRow } from '@mui/material'

import { UiLoader } from '@/shared/ui/kit/loader'

import { getDebtConfig } from '../../domain/table'
import { ACCOUNT_STATUS } from '../../lib/constants'

export function Layout({
  isLoading,
  items,
  onChangeStatus,
  renderChip,
  renderActions
}: {
  isLoading?: boolean
  items?: Account[]
  onChangeStatus: (id: AccountId, status: AccountStatus) => void
  renderChip: (status: AccountStatus) => ReactNode
  renderActions: (id: string) => ReactNode
}) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell
          colSpan={6}
          align='center'>
          <UiLoader />
        </TableCell>
      </TableRow>
    )
  }

  if (items?.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={6}
          align='center'>
          Нет данных
        </TableCell>
      </TableRow>
    )
  }

  return items?.map((item) => (
    <TableRow
      key={item.id}
      hover>
      <TableCell>{item?.code}</TableCell>
      <TableCell>
        <Select
          value={item?.status}
          onChange={(e) =>
            onChangeStatus(item.id, e.target.value as AccountStatus)
          }
          size='small'
          sx={{ minWidth: 120 }}>
          {ACCOUNT_STATUS.map((status) => (
            <MenuItem
              key={status}
              value={status}>
              {renderChip(status)}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>{item?.owner}</TableCell>
      <TableCell>{item?.address}</TableCell>
      <TableCell>{getDebtConfig(item.debt)} ₽</TableCell>
      <TableCell>{renderActions(item.id)}</TableCell>
    </TableRow>
  ))
}
