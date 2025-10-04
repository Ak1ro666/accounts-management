import { useOpenModal } from '../model/use-open-modal'

export function useStartOpenFileStorageModal() {
  return useOpenModal((store) => store.open)
}
