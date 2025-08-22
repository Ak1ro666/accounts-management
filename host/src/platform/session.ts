/* eslint-disable react-hooks/rules-of-hooks */
import { useSyncExternalStore } from 'react'

import { UserRole } from '../domains/supports/authorization'
import { publicApiClient } from './api'
import { BroadcastEvents } from './lib/broadcast-events'
import { LOCAL_STORAGE_AUTH_TOKEN } from './model/constants'

import { parseJwt } from '@/platform/lib/api'

type Session = {
  userId: number
  email: string
  role: UserRole
}

let refreshTokenPromise: Promise<string | null> | null = null

class SessionStore {
  public updateSessionStream = new BroadcastEvents<
    { type: 'update'; token: string } | { type: 'remove' }
  >('session')

  getSessionToken() {
    return localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN)
  }

  setSessionToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, token)

    const event = new StorageEvent('storage', {
      key: LOCAL_STORAGE_AUTH_TOKEN,
      newValue: token,
      oldValue: localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN),
      storageArea: localStorage
    })

    window.dispatchEvent(event)

    this.updateSessionStream.emit({ type: 'update', token })
  }

  removeSession() {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN)
    this.updateSessionStream.emit({ type: 'remove' })
  }

  getSession() {
    return tokenToSession(this.getSessionToken())
  }

  isSessionExpired() {
    const session = this.getSession()
    return !session || Date.now() > session.exp * 1000
  }
  getRefreshToken = async () => {
    refreshTokenPromise =
      refreshTokenPromise ??
      publicApiClient<{ token: string }>({
        url: '/refresh',
        method: 'POST'
      })
        .then((result) => {
          appSessionStore.setSessionToken(result.token)
          return result.token
        })
        .catch(() => {
          appSessionStore.removeSession()
          return null
        })
        .finally(() => {
          refreshTokenPromise = null
        })

    return refreshTokenPromise
  }

  useSession = () => {
    const token = useSyncExternalStore(
      this.updateSessionStream.listen,
      this.getSessionToken,
      () => null
    )

    return tokenToSession(token)
  }
}

const tokenToSession = (token: string | null) => {
  if (!token) return null

  return parseJwt<Session>(token)
}

export const appSessionStore = new SessionStore()
