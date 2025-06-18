import type { AccountId } from '../account'

import { EventEmitter } from '@/shared/lib/event-emitter'

type CheckContextType = {
  updateCheck: AccountId
  onChangeOpenModal: AccountId
}

export const checkModalEventEmitter = new EventEmitter<CheckContextType>()
