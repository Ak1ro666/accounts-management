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

import { Can } from '@/shared/lib/permissions'

import { getOwnerOptions } from './domain/account'
import { Filters } from './facade/filters'
import { useAccountsFacade } from './facade/use-accounts-facade'
import { useFilters } from './model/use-filters'
import { CreateCheckButton } from './ui/create-check-button'
import { ModalsLayout } from './ui/modals-layout'
import { Root } from './ui/root'

function Page() {
  const accounts = useAccountsFacade()
  const { getFilteredAccounts } = useFilters()
  const { t } = useTranslation('accounts')

  const startCreateAccount = useStartCreate()
  const startOpenFilesStorageModal = useStartOpenModal()

  return (
    <Root
      title={t('title')}
      actionsPannel={<Filters ownerOptions={getOwnerOptions(accounts.data)} />}
      createForm={
        <Can
          permissions={accounts.permissions}
          action='canCreateAccount'>
          <CreateCheckButton onClick={startCreateAccount} />
        </Can>
      }
      mainContent={
        <TableFlow
          items={getFilteredAccounts(accounts.data)}
          removeAccount={accounts.remove}
          updateAccount={accounts.update}
          isLoading={accounts.isLoading}
        />
      }
      modals={
        <ModalsLayout>
          <CreateCheckModal
            createCheck={accounts.create}
            accountsData={accounts.data}
          />
          <UpdateCheckModal
            openFilesStorage={startOpenFilesStorageModal}
            updateCheck={accounts.update}
          />
          <ManageFilesStorageModal />
        </ModalsLayout>
      }
    />
  )
}

export const Component = Page
