import { ReactNode } from 'react'
import { MenuItem, Select, TableCell, TableRow } from '@mui/material'

import { Account, AccountId, AccountStatus } from '@/kernel(platform)/account'

import { getDebtConfig } from '../../domain/table'
import { ACCOUNT_STATUS } from '../../lib/constants'

export function Layout({
  item,
  onChangeStatus,
  renderActions,
  renderChip
}: {
  item: Account
  onChangeStatus: (id: AccountId, status: AccountStatus) => void
  renderChip: (status: AccountStatus) => ReactNode
  renderActions: (id: string) => ReactNode
}) {
  return (
    <TableRow hover>
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
  )
}
