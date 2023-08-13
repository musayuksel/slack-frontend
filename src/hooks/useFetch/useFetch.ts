import { useState, useEffect } from 'react';
import { FetchResponse, HttpMethod } from './useFetch.interface';

export const useFetch = (url: string, method: HttpMethod, body: string | null): FetchResponse => {
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
          body: body ? body : undefined,
        };

        const res = await fetch(url, requestOptions);

        if (!res.ok) {
          throw new Error(`HTTP error, status = ${res.status}`);
        }

        const data = await res.json();

        setResponse({
          data,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        setResponse({
          data: null,
          error,
          isLoading: false,
        });
      }
    };

    fetchData();
  }, [url, method, body]);

  return response;
};
