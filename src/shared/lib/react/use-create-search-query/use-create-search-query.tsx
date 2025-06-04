import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { QueryParamRecord, QueryParamConfig } from "./types";
import { getDefaultTransformer } from "./transformers";

const useQueryParams = <T extends QueryParamRecord>(configs: {
  [K in keyof T]: QueryParamConfig<T[K]>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    return Object.entries(configs).reduce((acc, [key, config]) => {
      const { name, defaultValue, transformer } = config as QueryParamConfig<
        T[keyof T]
      >;
      const paramTransformer =
        transformer ?? getDefaultTransformer(defaultValue);
      const paramValue = searchParams.get(name);

      acc[key as keyof T] = paramTransformer.decode(paramValue) ?? defaultValue;
      return acc;
    }, {} as T);
  }, [searchParams, configs]);

  const updateParams = useCallback(
    (updates: Partial<T>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        const config = configs[key as keyof T];
        if (!config) return;

        const { name, defaultValue, transformer } = config;
        const paramTransformer =
          transformer ?? getDefaultTransformer(defaultValue);
        const encodedValue = paramTransformer.encode(value as T[keyof T]);

        if (encodedValue === null || encodedValue === undefined) {
          newSearchParams.delete(name);
        } else {
          newSearchParams.set(name, String(encodedValue));
        }
      });

      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams, configs],
  );

  const resetParams = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(configs).forEach(([_, config]) => {
      const { name, defaultValue, transformer } = config as QueryParamConfig<
        T[keyof T]
      >;
      const paramTransformer =
        transformer ?? getDefaultTransformer(defaultValue);
      const encodedValue = paramTransformer.encode(defaultValue);

      if (encodedValue === null || encodedValue === undefined) {
        newSearchParams.delete(name);
      } else {
        newSearchParams.set(name, String(encodedValue));
      }
    });

    setSearchParams(newSearchParams, { replace: true });
  }, [searchParams, configs, setSearchParams]);

  return {
    params,
    updateParams,
    resetParams,
  };
};

export const createSearchQueryParams = <T extends QueryParamRecord>(configs: {
  [K in keyof T]: QueryParamConfig<T[K]>;
}) => {
  return () => useQueryParams<T>(configs);
};
