export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface IFetchDataArgs {
  url: string;
  method?: HttpMethod;
  body?: string | null;
}
