import { useEffect, useState } from 'react'

export function useQuery<T>({
  fetcher,
  options
}: {
  fetcher: () => Promise<T>
  options?: {
    initialData?: T
    subscribeTimeout?: number
    refetchInterval?: number
  }
}) {
  const [data, setData] = useState<T | undefined>(options?.initialData)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const subscribeData = async () => {
    try {
      await fetcher().then(setData)
      await subscribeData()
    } catch (e) {
      setTimeout(() => subscribeData(), options?.subscribeTimeout)
      console.error(e)
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    setError(undefined)
    return await fetcher()
      .then(setData)
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message)
        }
      })
      .finally(() => setIsLoading(false))
      .finally(() => {
        if (options?.subscribeTimeout) {
          subscribeData()
        }
      })
  }

  const refetchInterval = async () => {
    return await fetcher()
      .then(setData)
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message)
        }
      })
  }

  useEffect(() => {
    fetchData()

    if (options?.refetchInterval) {
      const intervalId = setInterval(refetchInterval, options.refetchInterval)

      return () => clearInterval(intervalId)
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  } as const
}
