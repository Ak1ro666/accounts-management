import { UiModal } from "@/shared/ui/modal";
import { ModalHeader } from "../ui/modal-header";
import { UiTransition } from "@/shared/ui/transition";

import { ModalBody } from "./modal-body";
import { useOpenModal } from "../model/use-open-modal";

export function ManageFilesStorageModal() {
  const isOpen = useOpenModal((store) => store.isOpen);
  const close = useOpenModal((store) => store.close);

  return (
    <UiModal
      open={isOpen}
      TransitionComponent={UiTransition}
      header={<ModalHeader onCloseModal={close} />}
      body={<ModalBody />}
      fullScreen
    />
  );
}
