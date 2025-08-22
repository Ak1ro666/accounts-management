import type { Account, AccountId, UpdateData } from '@/domains/contacts/accounts'
import { checkModalEventEmitter } from '@/domains/contacts/check-modal'

import { useDeleteConfirmation } from '../model/use-delete-confirmation'
import { StatusChip } from '../ui/chip'
import { TableActions } from '../ui/table-actions'
import { TableItem } from '../ui/table-item'
import { TableLayout } from '../ui/table-layout'

export function TableBody({
  items,
  remove,
  update
}: {
  remove: (id: AccountId) => Promise<void>
  update: (id: AccountId, data: UpdateData) => void
  items: Account[]
}) {
  const onDeleteConfirmation = useDeleteConfirmation(remove)

  return (
    <TableLayout
      items={items}
      renderItem={(item) => (
        <TableItem
          key={item.id}
          item={item}
          onChangeStatus={(id, status) => update(id, { status })}
          renderChip={(status) => <StatusChip status={status} />}
          renderActions={(id) => (
            <TableActions
              onDeleteClick={() => onDeleteConfirmation(id)}
              onEditClick={() =>
                checkModalEventEmitter.emit('onChangeOpenModal', id)
              }
            />
          )}
        />
      )}
    />
  )
}
