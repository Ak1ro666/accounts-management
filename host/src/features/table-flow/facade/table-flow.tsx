import type { Account, AccountId } from '@/kernel/account'
import type { UpdateData } from '@/kernel/api/accounts'

import { useFilters } from '../model/use-filters'
import { usePagination } from '../model/use-pagination'
import { Root } from '../ui/root'
import { TableHeader } from '../ui/table-header'
import { TablePagination } from '../ui/table-pagination'
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
          count={items.length}
          {...pagination.getContainerProps()}
        />
      }
    />
  )
}
