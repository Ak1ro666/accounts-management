import { getOwnerOptions } from './domain/account'
import { Filters } from './facade/filters'
import { useAccountsFacade } from './facade/use-accounts-facade'
import { useFilters } from './model/use-filters'
import { useTranslationPage } from './model/use-translation-page'
import { CreateCheckButton } from './ui/create-check-button'
import { ModalsLayout } from './ui/modals-layout'
import { Root } from './ui/root'

import { fileStorageContext } from '@/domains/contacts/file-storage'
import { ManageFilesStorageModal } from '@/domains/core/manage-files-storage'
import { TableFlow } from '@/domains/core/table-flow'
import {
  CreateCheckModal,
  UpdateCheckModal,
  useStartCreate
} from '@/domains/supports/manage-check'
import { Can } from '@/platform/lib/permissions'

function Page() {
  const accounts = useAccountsFacade()
  const filters = useFilters()
  const t = useTranslationPage()

  const startCreateAccount = useStartCreate()
  const fileStorage = fileStorageContext.use()

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
          items={filters.getFilteredData(accounts.data)}
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
            openFilesStorage={fileStorage.open}
            updateCheck={accounts.update}
          />
          <ManageFilesStorageModal />
        </ModalsLayout>
      }
    />
  )
}

export const Component = Page
