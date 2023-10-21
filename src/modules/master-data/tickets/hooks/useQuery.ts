import {
  createTicket,
  deleteTicket,
  getTicketDetails,
  getTickets,
  updateTicket,
} from '../api';
import { TTicketParams, TTicketPayload } from '../entities/request';
import {
  TTicketDetailResponse,
  TTicketPaginateResponse,
  TTicketResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetTickets = (
  value: TGetListHookParams<TTicketParams, TTicketPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-tickets', value.params],
    queryFn: () => getTickets(value.params),
    ...value.options,
  });
};

export const useGetTicketDetails = (
  value: TGetDetailHookParams<TTicketResponse['id'], TTicketDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-ticket-details', value.id],
    queryFn: () => getTicketDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateTicket = (): TExpectMutationResult<
  TTicketDetailResponse,
  TTicketPayload
> => {
  return useMutation(createTicket);
};

export const useUpdateTicket = (): TExpectMutationResult<
  TTicketDetailResponse,
  TUpdateParams<TTicketResponse['id'], TTicketPayload>
> => {
  return useMutation(updateTicket);
};

export const useDeleteTicket = (): TExpectMutationResult<
  string,
  TTicketResponse['id']
> => {
  return useMutation(deleteTicket);
};
