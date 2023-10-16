import { UseQueryOptions } from 'react-query';
import { TResponseError } from './response';

export type TGetListHookParams<Params, Response> = {
  params?: Params;
  options?: UseQueryOptions<Response, TResponseError<Response>>;
};

export type TGetDetailHookParams<Id, Response> = {
  id: Id;
  options?: UseQueryOptions<Response, TResponseError<Response>>;
};

export type TUpdateParams<Id, Payload> = {
  id: Id;
  payload: Payload;
};

export type TDefaultParams<T> = TPaginateParams & TSortParams<T>;

export type TSortParams<T> = {
  orderBy?: keyof T | string;
  orderType?: 'asc' | 'desc';
};

export type TPaginateParams = {
  perPage?: number;
  page?: number;
};
