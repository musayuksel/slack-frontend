import { useState, useEffect } from 'react';
import { FetchResponse, HttpMethod } from './useFetch.interface';

export const useFetch = (url: string, method: HttpMethod, body: string | null = null): FetchResponse => {
  const [response, setResponse] = useState<FetchResponse>({
    data: null,
    error: null,
    isLoading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setResponse((prevResponse) => ({
        ...prevResponse,
        isLoading: true,
      }));

      const token = sessionStorage.getItem('token')?.slice(1, -1); //delete quotes

      try {
        const requestOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: body,
        };

        const res = await fetch(url, requestOptions);
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

    fetchData();
  }, [url, method, body]);

  return response;
};
