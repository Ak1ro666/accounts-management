import { EventEmitter } from "@/shared/infastructure/event-emitter";
import { AccountId } from "../account";

type CheckContextType = {
  updateCheck: AccountId;
  onChangeOpenModal: AccountId;
};

export const checkModalEventEmitter = new EventEmitter<CheckContextType>();
