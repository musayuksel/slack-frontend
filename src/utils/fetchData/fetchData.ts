import { HttpMethod } from '../../hooks/useFetch/useFetch.interface';
import { IFetchDataArgs } from './fetchData.interface';

const BASE_URL = 'http://localhost:3000/api';

export const fetchData = async ({ url, method = HttpMethod.GET, body = null }: IFetchDataArgs) => {
  const token = sessionStorage.getItem('token')?.slice(1, -1); //delete quotes

  const completeUrl = BASE_URL + url;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const requestOptions: RequestInit = {
    method,
    headers,
    body,
  };
  const data = await fetch(completeUrl, requestOptions);
  return data;
};
