import { ROUTES } from "./config";

type PathRoutes = (typeof ROUTES)[keyof typeof ROUTES];
type StringNotNull<S extends string> = S extends "" ? true : false;

type RemoveSlashFromString<S extends string> =
  S extends `${infer V extends string}/` ? V : S;

type UnionKeyFromPath<
  S extends string = "",
  Acc extends readonly unknown[] = [],
> = S extends `/${string}/:${infer V}/:${infer Rest}`
  ? UnionKeyFromPath<Rest, [...Acc, V]>
  : S extends `/${string}/:${infer Rest}`
    ? [...Acc, Rest][number]
    : S extends `${infer V}/:${infer Rest}`
      ? UnionKeyFromPath<Rest, [...Acc, V]>
      : StringNotNull<S> extends true
        ? [...Acc][number]
        : [...Acc, RemoveSlashFromString<S>][number];

export const href = <S extends PathRoutes>(
  url: S,
  options: Record<UnionKeyFromPath<S>, string>,
) => {
  let newUrl = url;
  for (const key in options) {
    if (options?.[key as UnionKeyFromPath<S>] === undefined) continue;
    newUrl = newUrl.replace(
      `:${key}`,
      options[key as UnionKeyFromPath<S>]!,
    ) as S;
  }

  return newUrl;
};
