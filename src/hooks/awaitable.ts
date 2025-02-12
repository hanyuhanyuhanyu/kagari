import { useEffect, useReducer, useState } from "react";

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
export const useAwaitable = <T extends (...args: any) => Promise<any>>(
  f: T
) => {
  return (...arg: Parameters<T>): AwaitResult<Awaited<ReturnType<T>>> => {
    type TargetType = AwaitResult<Awaited<ReturnType<T>>>;
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
      f(...arg)
        .then((result) => dispatch({ result, processed: true, loading: false }))
        .catch((error) => dispatch({ error, processed: true, loading: false }));
    }, [...arg]);
    return state;
  };
};
