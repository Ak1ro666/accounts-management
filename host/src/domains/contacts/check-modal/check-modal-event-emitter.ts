import type { AccountId } from '../accounts'

import { EventEmitter } from '@/platform/lib/event-emitter'

type CheckContextType = {
  updateCheck: AccountId
  onChangeOpenModal: AccountId
}

export const checkModalEventEmitter = new EventEmitter<CheckContextType>()
