import { useCreateCheck } from "../model/use-create-check";

export function useStartCreate() {
  return useCreateCheck((store) => store.startCreate);
}
