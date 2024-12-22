import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

type UseAppwriteOptionsType<T, P extends Record<string, string | number>> = {
  fn: (params: P) => Promise<T>;
  params?: P;
  skip?: boolean;
};

type UseAppwriteReturnType<T, P> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: (params: P) => Promise<void>;
};

export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn,
  params = {} as P,
  skip = false,
}: UseAppwriteOptionsType<T, P>): UseAppwriteReturnType<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (params: P) => {
      setLoading(true);
      setError(null);

      try {
        const result = await fn(params);
        setData(result);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        Alert.alert('Error', errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [fn],
  );

  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []);

  const refetch = async (params: P) => await fetchData(params);

  return { data, loading, error, refetch };
};