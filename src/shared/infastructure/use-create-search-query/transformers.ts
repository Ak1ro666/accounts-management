import type { QueryParamTransformer, QueryParamValue } from "./types";

export const defaultStringTransformer: QueryParamTransformer<string> = {
  encode: (value) => value,
  decode: (value) =>
    value === null || value === undefined ? "" : String(value),
};

export const defaultNumberTransformer: QueryParamTransformer<number> = {
  encode: (value) => (isNaN(value) ? null : String(value)),
  decode: (value) => {
    if (value === null || value === undefined) return NaN;
    const num = Number(value);
    return isNaN(num) ? NaN : num;
  },
};

export const defaultBooleanTransformer: QueryParamTransformer<boolean> = {
  encode: (value) => (value ? "1" : "0"),
  decode: (value) => value === "1",
};

export const createArrayTransformer = <T>(
  itemTransformer: QueryParamTransformer<T>,
  delimiter = ",",
): QueryParamTransformer<T[]> => ({
  encode: (values) =>
    values.map((value) => itemTransformer.encode(value)).join(delimiter),
  decode: (value) => {
    if (value === null || value === undefined) return [];
    return String(value)
      .split(delimiter)
      .map((item) => itemTransformer.decode(item));
  },
});

export const dateTransformer: QueryParamTransformer<Date | null> = {
  encode: (date: Date | null) => {
    if (date === null) return null;
    if (!(date instanceof Date) || isNaN(date.getTime())) return null;
    return date.toISOString();
  },
  decode: (value: QueryParamValue) => {
    if (value === null) return null;
    if (value === undefined) return null;

    try {
      const date = new Date(String(value));
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  },
};

export const dateOnlyTransformer: QueryParamTransformer<Date> = {
  encode: (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return null;
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  },
  decode: (value) => {
    if (value === null || value === undefined) return new Date(NaN);
    try {
      // Добавляем время, чтобы избежать проблем с часовыми поясами
      const date = new Date(String(value) + "T00:00:00");
      return isNaN(date.getTime()) ? new Date(NaN) : date;
    } catch {
      return new Date(NaN);
    }
  },
};

export const getDefaultTransformer = <T>(
  defaultValue: T,
): QueryParamTransformer<T> => {
  if (defaultValue instanceof Date) {
    return dateTransformer as unknown as QueryParamTransformer<T>;
  }

  switch (typeof defaultValue) {
    case "number":
      return defaultNumberTransformer as unknown as QueryParamTransformer<T>;
    case "boolean":
      return defaultBooleanTransformer as unknown as QueryParamTransformer<T>;
    default:
      return defaultStringTransformer as unknown as QueryParamTransformer<T>;
  }
};
