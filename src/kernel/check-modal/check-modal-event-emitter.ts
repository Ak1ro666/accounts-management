import { EventEmitter } from "@/shared/lib/event-emitter";
import type { AccountId } from "../account";

type CheckContextType = {
  updateCheck: AccountId;
  onChangeOpenModal: AccountId;
};

export const checkModalEventEmitter = new EventEmitter<CheckContextType>();
