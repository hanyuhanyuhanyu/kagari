import { useEffect, useReducer } from "react";

type AwaitResult<T> = {
  loading: boolean;
} & (
  | {
      result: undefined;
      processed: false;
      error: null;
    }
  | {
      result: T;
      processed: true;
      error: null;
    }
  | {
      result: undefined;
      processed: true;
      error: Error;
    }
);
export const useAwaitable = <T extends unknown[], U>(
  f: (...args: T) => Promise<U>,
  ...args: T
): AwaitResult<U> => {
  type TargetType = AwaitResult<U>;
  const [state, dispatch] = useReducer(
    (r: TargetType, action: Partial<TargetType>) =>
      Object.assign({}, r, action),
    {
      loading: false,
      result: undefined,
      processed: false,
      error: null,
    }
  );

  useEffect(() => {
    dispatch({ loading: true });
    f(...args)
      .then((result) =>
        dispatch({
          result: result,
          processed: true,
          loading: false,
        })
      )
      .catch((error) => dispatch({ error, processed: true, loading: false }));
  }, []);
  return state;
};
