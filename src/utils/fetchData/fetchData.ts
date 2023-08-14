import { HttpMethod } from './fetchData.interface';

export const fetchData = async (url: string, method: HttpMethod, body: string | null = null) => {
  const token = sessionStorage.getItem('token')?.slice(1, -1); //delete quotes

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    method,
    headers,
    body,
  };
  const data = await fetch(url, requestOptions);
  return data;
};
