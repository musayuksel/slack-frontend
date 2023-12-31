import { useState, useEffect } from 'react';
import { FetchResponse, HttpMethod } from './useFetch.interface';
import { IFetchDataArgs, fetchData } from '../../utils';

export const useFetch = <T>({ url, method = HttpMethod.GET, body = null }: IFetchDataArgs): FetchResponse<T> => {
  const [response, setResponse] = useState<FetchResponse<T>>({
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
        const res = await fetchData({ url, method, body });

        const { success, data, message } = await res.json();

        if (!success) {
          throw new Error(message);
        }

        setResponse({
          data: data,
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
