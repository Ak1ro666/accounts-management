export type QueryParamValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export type QueryParamRecord = Record<string, QueryParamValue>;

export type QueryParamTransformer<T> = {
  encode: (value: T) => QueryParamValue;
  decode: (value: QueryParamValue) => T;
};

export type QueryParamConfig<T> = {
  name: string;
  defaultValue: T;
  transformer?: QueryParamTransformer<T>;
};
