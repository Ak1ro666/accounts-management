import { useEffect, useState } from "react";

export function useLoad<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    return await fetcher()
      .then(setData)
      .finally(() => setIsLoading(false));
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
