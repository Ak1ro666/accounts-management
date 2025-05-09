import { useEffect, useState } from "react";

export function useQuery<T>({
  fetcher,
  options,
}: {
  fetcher: () => Promise<T>;
  options?: {
    initialData?: T;
    subscribeTimeout?: number;
    refetchInterval?: number;
  };
}) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const subscribeData = async () => {
    try {
      await fetcher().then(setData);
      await subscribeData();
    } catch (e) {
      setTimeout(() => subscribeData(), options?.subscribeTimeout);
      console.error(e);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    return await fetcher()
      .then(setData)
      .finally(() => setIsLoading(false))
      .finally(() => {
        if (options?.subscribeTimeout) {
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
