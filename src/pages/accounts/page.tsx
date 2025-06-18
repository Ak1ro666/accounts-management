import { useTranslation } from 'react-i18next'

import {
  CreateCheckModal,
  UpdateCheckModal,
  useStartCreate
} from '@/features/manage-check'
import {
  ManageFilesStorageModal,
  useStartOpenModal
} from '@/features/manage-files-storage'
import { TableFlow } from '@/features/table-flow'

import { useAccounts } from './model/use-accounts'
import { useFilters } from './model/use-filters'
import { CreateCheckButton } from './ui/create-check-button'
import { FilteredActions } from './ui/filtered-actions'
import { Filters } from './ui/filters'
import { Root } from './ui/root'

function Page() {
  const accounts = useAccounts()
  const [filteredItems, filters] = useFilters(accounts.data)
  const startCreate = useStartCreate()
  const startOpenModal = useStartOpenModal()
  const { t } = useTranslation('accounts')

  return (
    <Root
      title={t('title')}
      actionsPannel={
        <Filters
          filters={filters.data}
          onChangeFilters={filters.onChangeFilters}
          ownerOptions={accounts.ownerOptions}
          filtersActions={
            <FilteredActions
              onResetClick={filters.reset}
              onSearchClick={filters.startSearch}
            />
          }
        />
      }
      actions={<CreateCheckButton onClick={startCreate} />}
      tableFlow={
        <TableFlow
          items={filteredItems}
          remove={accounts.remove}
          update={accounts.update}
          isLoading={accounts.isLoading}
        />
      }
      modals={
        <>
          <CreateCheckModal
            createCheck={accounts.create}
            accountsData={accounts.data}
          />
          <UpdateCheckModal
            openFilesStorage={startOpenModal}
            updateCheck={accounts.update}
          />
          <ManageFilesStorageModal />
        </>
      }
    />
  )
}

export const Component = Page
