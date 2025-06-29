import { appSessionStore } from '@/kernel/session'

export function useSession() {
  return appSessionStore.useSession()
}
