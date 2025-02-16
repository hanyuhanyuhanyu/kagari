import { useCallback, useEffect, useReducer, useState } from "react";

type AwaitResult<T> = {
  loading: boolean;
  reload(): void;
} & (
  | {
      result: undefined;
      processed: false;
      valid: false;
      error: null;
    }
  | {
      result: T;
      processed: true;
      valid: true;
      error: null;
    }
  | {
      result: undefined;
      processed: true;
      valid: false;
      error: Error;
    }
);
export const useAwaitable = <T extends unknown[], U>(
  f: (...args: T) => Promise<U>,
  ...args: T
): AwaitResult<U> => {
  type TargetType = AwaitResult<U>;
  const [reloadKey, setReloadKey] = useState<number>(Math.random());
  const reload = useCallback(() => setReloadKey(Math.random()), []);
  const [state, dispatch] = useReducer(
    (r: TargetType, action: Partial<TargetType>) =>
      Object.assign({}, r, action),
    {
      loading: false,
      result: undefined,
      processed: false,
      valid: false,
      error: null,
      reload,
    }
  );

  useEffect(() => {
    dispatch({ loading: true });
    f(...args)
      .then((result) =>
        dispatch({
          result,
          processed: true,
          valid: true,
          loading: false,
        })
      )
      .catch((error) =>
        dispatch({ error, valid: false, processed: true, loading: false })
      );
  }, [reloadKey]);
  return state;
};
