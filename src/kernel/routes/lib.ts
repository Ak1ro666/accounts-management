/* eslint-disable @typescript-eslint/no-explicit-any */
type PathToTuple<T> = T extends `/${infer P1}/${infer Rest}`
  ? [P1, ...PathToTuple<`/${Rest}`>]
  : T extends `/${infer P1}`
    ? [P1]
    : never

type FilterPathParams<T extends string[]> = T[number] extends infer R
  ? R extends `:${infer P}`
    ? P
    : never
  : never

type PathToParams<T> = Record<FilterPathParams<PathToTuple<T>>, string>

export function href<T extends `${string}:${string}`>(
  route: T,
  params: PathToParams<T>
): string
export function href(route: string, params: any) {
  return route.toString().replace(/:(\w+)/g, (_match, key) => params[key] || '')
}
