export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const isNonEmptyString = (val: unknown): val is string =>
  typeof val === 'string' && val.trim().length > 0;
