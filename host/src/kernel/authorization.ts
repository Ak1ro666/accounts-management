import { appSessionStore } from './session'

type AppPermissions = {
  accounts: {
    canView: () => boolean
    canManage: () => boolean
  }
  filesStorage: {
    canView: (id: string) => boolean
    canCreateFile: (id: string) => boolean
  }
}

export const createAdminPermissions = (): AppPermissions => ({
  accounts: {
    canManage: () => true,
    canView: () => true
  },
  filesStorage: {
    canCreateFile: () => true,
    canView: () => true
  }
})

export const createUserPermissions = (): AppPermissions => ({
  accounts: {
    canManage: () => false,
    canView: () => true
  },
  filesStorage: {
    canCreateFile: () => true,
    canView: () => true
  }
})

export enum UserRole {
  USER = 'USER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER'
}

export function useRole() {
  const session = appSessionStore.useSession()

  return session?.role ?? UserRole.VIEWER
}
