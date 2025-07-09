import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

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

import { ROUTES } from '@/kernel/routes'

import { Can } from '@/shared/lib/permissions'

import { getOwnerOptions } from './domain/account'
import { useAccountsFacade } from './facade/use-accounts-facade'
import { useFilters } from './model/use-filters'
import { CreateCheckButton } from './ui/create-check-button'
import { FilteredActions } from './ui/filtered-actions'
import { Filters } from './ui/filters'
import { Root } from './ui/root'

function Page() {
  const accounts = useAccountsFacade()
  const [filteredItems, filters] = useFilters(accounts.data)
  const { t } = useTranslation('accounts')

  const startCreateAccount = useStartCreate()
  const startOpenFilesStorageModal = useStartOpenModal()

  return (
    <Can
      permissions={accounts.permissions}
      action='canView'
      def={
        <Navigate
          to={ROUTES.FORBIDEN}
          replace
        />
      }>
      <Root
        title={t('title')}
        actionsPannel={
          <Filters
            filters={filters.data}
            onChangeFilters={filters.onChangeFilters}
            ownerOptions={getOwnerOptions(accounts.data)}
            actions={
              <FilteredActions
                onResetClick={filters.reset}
                onSearchClick={filters.startSearch}
              />
            }
          />
        }
        createForm={
          <Can
            permissions={accounts.permissions}
            action='canCreateAccount'>
            <CreateCheckButton onClick={startCreateAccount} />
          </Can>
        }
        flow={
          <TableFlow
            items={filteredItems}
            removeAccount={accounts.remove}
            updateAccount={accounts.update}
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
              openFilesStorage={startOpenFilesStorageModal}
              updateCheck={accounts.update}
            />
            <ManageFilesStorageModal />
          </>
        }
      />
    </Can>
  )
}

export const Component = Page
