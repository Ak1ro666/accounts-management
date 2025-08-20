export type Brand<T, B extends string> = T & { __brand: B };
export type AccountId = Brand<string, 'AccountId'>;
