/* eslint-disable @typescript-eslint/no-explicit-any */
export type Barnd<T, K> = T & { __brand: K }
export type MyReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any
