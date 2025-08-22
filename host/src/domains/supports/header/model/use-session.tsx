import { appSessionStore } from '@/platform/session'

export function useSession() {
  return appSessionStore.useSession()
}
