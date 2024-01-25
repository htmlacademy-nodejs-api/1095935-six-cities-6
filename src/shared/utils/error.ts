export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : "";

type TErrorData<E, D> = [E, undefined] | [undefined, D];

export const handlePromise = <D = unknown, E = Error>(
  promise: Promise<D>
): Promise<TErrorData<E, D>> =>
  promise
    .then((data) => [undefined, data])
    .catch((error) => Promise.resolve([error, undefined])) as Promise<
    TErrorData<E, D>
  >;

export const handleTryCatch = <D = unknown, E = Error>(
  result: D
): TErrorData<E, D> => {
  try {
    return [undefined, result];
  } catch (error) {
    return [error as E, undefined];
  }
};
