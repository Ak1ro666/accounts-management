/* eslint-disable @typescript-eslint/ban-ts-comment */
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

href('/users/:id/posts/:postId', { id: '1', postId: '2' }) // id, postId
href('/users/:id/posts', { id: '1' }) // id
// @ts-expect-error
href('/users', {}) // Error
