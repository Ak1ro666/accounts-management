import { useOpenModal } from "../model/use-open-modal";

export function useStartOpenModal() {
  return useOpenModal((store) => store.open);
}
