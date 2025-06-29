type UnionKeyFromPath<
  S extends string = '',
  Acc extends string[] = []
> = S extends `/:${infer Param}/${infer Rest}`
  ? UnionKeyFromPath<`/${Rest}`, [...Acc, Param]>
  : S extends `/:${infer Param}`
    ? [...Acc, Param][number]
    : S extends `${string}/:${infer Param}/${infer Rest}`
      ? UnionKeyFromPath<`/${Rest}`, [...Acc, Param]>
      : S extends `${string}/:${infer Param}`
        ? [...Acc, Param][number]
        : Acc[number]

export const href = <S extends string>(
  url: S,
  options: Record<UnionKeyFromPath<S>, string>
) => {
  let newUrl = url
  for (const key in options) {
    if (options?.[key as UnionKeyFromPath<S>] === undefined) continue
    newUrl = newUrl.replace(
      `:${key}`,
      options[key as UnionKeyFromPath<S>]!
    ) as S
  }

  return newUrl
}

href('/users/:id/posts/:postId', { id: '1', postId: '2' })
