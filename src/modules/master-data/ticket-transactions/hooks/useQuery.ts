import {
  createTicketTransaction,
  deleteTicketTransaction,
  getTicketTransactionDetails,
  getTicketTransactions,
  updateTicketTransaction,
} from '../api';
import {
  TTicketTransactionParams,
  TTicketTransactionPayload,
} from '../entities/request';
import {
  TTicketTransactionDetailResponse,
  TTicketTransactionPaginateResponse,
  TTicketTransactionResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetTicketTransactions = (
  value: TGetListHookParams<
    TTicketTransactionParams,
    TTicketTransactionPaginateResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-ticketTransactions', value.params],
    queryFn: () => getTicketTransactions(value.params),
    ...value.options,
  });
};

export const useGetTicketTransactionDetails = (
  value: TGetDetailHookParams<
    TTicketTransactionResponse['id'],
    TTicketTransactionDetailResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-ticketTransaction-details', value.id],
    queryFn: () => getTicketTransactionDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateTicketTransaction = (): TExpectMutationResult<
  TTicketTransactionDetailResponse,
  TTicketTransactionPayload
> => {
  return useMutation(createTicketTransaction);
};

export const useUpdateTicketTransaction = (): TExpectMutationResult<
  TTicketTransactionDetailResponse,
  TUpdateParams<TTicketTransactionResponse['id'], TTicketTransactionPayload>
> => {
  return useMutation(updateTicketTransaction);
};

export const useDeleteTicketTransaction = (): TExpectMutationResult<
  string,
  TTicketTransactionResponse['id']
> => {
  return useMutation(deleteTicketTransaction);
};
