import { useState, useEffect } from 'react';
import { FetchResponse, HttpMethod } from './useFetch.interface';
import { fetchData } from '../../utils';

export const useFetch = (url: string, method: HttpMethod, body: string | null = null): FetchResponse => {
  const [response, setResponse] = useState<FetchResponse>({
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    const fetcher = async () => {
      setResponse((prevResponse) => ({
        ...prevResponse,
        isLoading: true,
      }));

      try {
        const res = await fetchData(url, method, body);

        if (res.status === 401) {
          throw new Error('Invalid access token');
        }
        if (!res.ok) {
          throw new Error(`HTTP error, status = ${res.status} (${res.statusText})`);
        }

        const data = await res.json();

        setResponse({
          data,
          error: null,
          isLoading: false,
        });
      } catch (error: any) {
        setResponse({
          data: null,
          error: error.message,
          isLoading: false,
        });
      }
    };

    fetcher();
  }, [url, method, body]);

  return response;
};
