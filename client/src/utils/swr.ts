import type { SWRConfiguration } from 'swr';
import { fetcher } from "./axios";

/**
 * Returns the url formatted with params
 * @param {string} url api url
 * @param {string | string[][] | Record<string, string> | URLSearchParams} params query params
 * @returns {string} url with query params
 */
export const getKey = (
    url: string,
    params?: string | string[][] | Record<string, string> | URLSearchParams
  ): string => {
    const usp = new URLSearchParams(params);
  
    // Create a stable key for SWR
    usp.forEach((value, key, parent) => {
      if (value === '') parent.delete(key);
    });
    usp.sort();
    return `${url}?${usp.toString()}`;
};

const swrConfig: SWRConfiguration = {
    fetcher,
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    },
};
  
export default swrConfig;