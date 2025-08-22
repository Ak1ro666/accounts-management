import { useRole, UserRole } from '@/domains/supports/authorization'

export type AccountsPermissions = {
  canView: () => boolean
  canCreateAccount: () => boolean
}

export function useAccountsPermissions(): AccountsPermissions {
  const role = useRole()

  return {
    canView: () => role === UserRole.ADMIN || role === UserRole.OWNER,
    canCreateAccount: () => role === UserRole.ADMIN || role === UserRole.OWNER
  }
}
