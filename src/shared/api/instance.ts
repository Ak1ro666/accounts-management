import { appSessionStore } from '@/kernel/session'

import { createApi } from '@/shared/api/create-api'
import { CONFIG } from '@/shared/model/config'

export const publicApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL
})

export const authorizedApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL,
  requestMiddlewares: [
    async (config) => {
      let token = appSessionStore.getSessionToken()

      if (!token || appSessionStore.isSessionExpired()) {
        token = await appSessionStore.getRefreshToken()
      }

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
      return config
    }
  ],
  responseMiddlewares: [
    async (response, config) => {
      if (response.status === 401) {
        const token = appSessionStore.getSessionToken()
        if (token) {
          const newToken = await appSessionStore.getRefreshToken()
          if (newToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newToken}`
            }

            return await fetch(config.url, config)
          }
        }

        appSessionStore.removeSessionToken()
      }
      return response
    }
  ]
})
