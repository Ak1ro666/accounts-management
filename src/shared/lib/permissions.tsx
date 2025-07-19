/* eslint-disable @typescript-eslint/no-explicit-any */
export function Can<
  P extends Record<string, (params: any) => boolean>,
  K extends keyof P
>({
  permissions,
  action,
  params,
  children,
  not,
  defaultComponent = null
}: {
  permissions: P
  action: K
  params?: Parameters<P[K]>[0]
  children: React.ReactNode
  not?: boolean
  defaultComponent?: React.ReactElement | null
}): React.ReactElement | null {
  const can = permissions[action](params)
  if (!not && !can) {
    return defaultComponent
  }

  if (not && can) {
    return defaultComponent
  }

  return <>{children}</>
}
