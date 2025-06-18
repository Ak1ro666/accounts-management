type CreateApiParams = {
  baseUrl: string
  requestMiddlewares?: RequestMiddleware[]
  responseMiddlewares?: ResponseMiddleware[]
}

type RequestConfig = RequestInit & {
  url: string
  json?: unknown
}

export class ApiError extends Error {
  constructor(
    public requestConfig: RequestConfig,
    public response: Response
  ) {
    super(response.statusText)
    this.name = 'ApiError'
  }
}

type RequestMiddleware = (
  config: RequestConfig
) => Promise<RequestConfig> | RequestConfig

type ResponseMiddleware = (
  config: Response,
  requestConfig: RequestConfig
) => Promise<Response> | Response

export function createApi({
  baseUrl,
  requestMiddlewares = [],
  responseMiddlewares = []
}: CreateApiParams) {
  return async function instanceApi<T>(config: RequestConfig) {
    if (config.json) {
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json'
      }
      config.body = JSON.stringify(config.json)
    }

    config.credentials = 'include'

    config = await requestMiddlewares.reduce(
      async (configPromise, middleware) => middleware(await configPromise),
      Promise.resolve(config)
    )

    let response = await fetch(`${baseUrl}${config.url}`, config)

    if (!response.ok) {
      throw new ApiError(config, response)
    }

    response = await responseMiddlewares.reduce(
      async (responsePromise, middleware) =>
        middleware(await responsePromise, config),
      Promise.resolve(response)
    )

    return response.json() as Promise<T>
  }
}
