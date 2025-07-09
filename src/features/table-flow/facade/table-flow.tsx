import type { Account, AccountId } from '@/kernel/account'
import type { UpdateData } from '@/kernel/api/accounts'

import { TablePagination } from '@mui/material'

import { TABLE_CONFIG } from '../lib/constants'
import { useFilters } from '../model/use-filters'
import { usePagination } from '../model/use-pagination'
import { Root } from '../ui/root'
import { TableHeader } from '../ui/table-header'
import { TableBody } from './table-body'

export function TableFlow({
  items,
  isLoading,
  removeAccount,
  updateAccount
}: {
  items: Account[]
  isLoading?: boolean
  removeAccount: (id: AccountId) => Promise<void>
  updateAccount: (id: AccountId, data: UpdateData) => void
}) {
  const filters = useFilters(items)
  const pagination = usePagination(filters.data)

  return (
    <Root
      isLoading={isLoading}
      header={
        <TableHeader
          selectedSort={filters.selectedSort}
          onChangeSelected={filters.onChangeSelected}
        />
      }
      body={
        <TableBody
          items={pagination.data}
          remove={removeAccount}
          update={updateAccount}
        />
      }
      footer={
        <TablePagination
          rowsPerPageOptions={TABLE_CONFIG.rowPerPageOptions}
          component='div'
          count={items.length}
          labelRowsPerPage='Строк на странице:'
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count}`
          }
          {...pagination.getContainerProps()}
        />
      }
    />
  )
}
