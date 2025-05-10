import { UiModal } from "@/shared/ui/kit/modal";
import { ModalHeader } from "../ui/modal-header";
import { UiTransition } from "@/shared/ui/kit/transition";

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
