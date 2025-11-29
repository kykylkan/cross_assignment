import { useEffect, useState } from 'react';

type UseAsyncDataResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Custom hook for async data loading with cleanup
 * Follows DRY principle by extracting common async loading pattern
 */
export function useAsyncData<T>(
  asyncFn: () => Promise<T>,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  dependencies: unknown[] = [],
): UseAsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await asyncFn();

        if (!isMounted) {
          return;
        }

        if (!result) {
          throw new Error('Data is currently unavailable.');
        }

        setData(result);
      } catch (err) {
        if (!isMounted) {
          return;
        }
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data.';
        setError(errorMessage);
        setData(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, isLoading, error };
}

