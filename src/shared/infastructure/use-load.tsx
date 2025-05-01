import { useEffect, useState } from "react";

export function useLoad<T>({
  fetcher,
  subscribe,
}: {
  fetcher: () => Promise<T>;
  subscribe?: {
    timeout: number;
  };
}) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const subscribeData = async () => {
    try {
      await fetcher().then(setData);
      await subscribeData();
    } catch (e) {
      setTimeout(() => subscribeData(), subscribe?.timeout);
      console.error(e);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    return await fetcher()
      .then(setData)
      .finally(() => setIsLoading(false))
      .finally(() => {
        if (subscribe) {
          subscribeData();
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    refetch: fetchData,
  } as const;
}
