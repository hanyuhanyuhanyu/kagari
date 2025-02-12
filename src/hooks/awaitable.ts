import { useEffect, useState } from "react";

export const useAwaitable = <T extends (...args: any) => Promise<any>>(
  f: T
) => {
  return (
    ...arg: Parameters<T>
  ): [Awaited<ReturnType<T>> | undefined, boolean, Error | null] => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Awaited<ReturnType<T>> | undefined>(
      undefined
    );
    const [error, setError] = useState(null);

    useEffect(() => {
      setLoading(true);
      f(...arg)
        .then(setResult)
        .catch(setError)
        .finally(() => setLoading(false));
    }, [...arg]);
    return [result, loading, error];
  };
};
