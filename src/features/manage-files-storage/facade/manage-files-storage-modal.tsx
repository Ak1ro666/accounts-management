import { UiModal } from '@/shared/ui/kit/modal'
import { UiTransition } from '@/shared/ui/kit/transition'

import { useOpenModal } from '../model/use-open-modal'
import { ModalHeader } from '../ui/modal-header'
import { ModalBody } from './modal-body'

export function ManageFilesStorageModal() {
  const isOpen = useOpenModal((store) => store.isOpen)
  const close = useOpenModal((store) => store.close)

  return (
    <UiModal
      open={isOpen}
      TransitionComponent={UiTransition}
      header={<ModalHeader onCloseModal={close} />}
      body={<ModalBody />}
      fullScreen
    />
  )
}
