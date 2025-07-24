/* eslint-disable @typescript-eslint/no-explicit-any */
export type Barnd<T, K> = T & { __brand: K }
export type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any

export type NullishPartial<T> = T extends unknown
  ? {
      [K in keyof T]: NullishPartial<T[K]> | null
    }
  : T | null

export type Simplify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K]
} & {}
