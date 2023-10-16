import { UseMutationResult, UseQueryResult } from 'react-query';
import { TResponseError } from './response';

export type TExpectQueryResult<Response> = UseQueryResult<
  Response,
  TResponseError<Response>
>;

export type TExpectMutationResult<Response, Payload> = UseMutationResult<
  Response,
  TResponseError<Response>,
  Payload
>;
