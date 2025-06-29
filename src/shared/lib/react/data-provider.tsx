import { ReactNode } from 'react'

import { useQuery } from './use-query'

export function DataProvider<T>({
  url,
  children
}: {
  url: string
  children: (data: {
    data: T | undefined
    isLoading: boolean
    error: string | undefined
    refetch: () => Promise<void>
  }) => ReactNode
}) {
  const { data, error, isLoading, refetch } = useQuery<T>({
    fetcher: () => fetch(url) as Promise<T>
  })
  console.log(data)

  return <>{children({ data, isLoading, error, refetch })}</>
}
