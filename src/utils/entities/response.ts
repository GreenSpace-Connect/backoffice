import { HttpStatusCode } from 'axios';

export type TResponseData<Response> = {
  statusCode: 200;
  message: string;
  data: Response;
};

export type TPaginateResponse<Response> = Omit<
  TResponseData<Response>,
  'data'
> & {
  meta: {
    currentPage: number;
    lastPage: number;
    next: string;
    perPage: number;
    prev: string;
    total: number;
  };
  items: Response[];
};

export type TResponseError<Response> = {
  statusCode: HttpStatusCode;
  message: {
    field: keyof Response;
    messages: string[];
  }[];
  error?: string;
};
