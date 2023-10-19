import {
  createEvent,
  deleteEvent,
  getEventDetails,
  getEvents,
  updateEvent,
} from '../api';
import { TEventParams, TEventPayload } from '../entities/request';
import {
  TEventDetailResponse,
  TEventPaginateResponse,
  TEventResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetEvents = (
  value: TGetListHookParams<TEventParams, TEventPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-events', value.params],
    queryFn: () => getEvents(value.params),
    ...value.options,
  });
};

export const useGetEventDetails = (
  value: TGetDetailHookParams<TEventResponse['id'], TEventDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-event-details', value.id],
    queryFn: () => getEventDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateEvent = (): TExpectMutationResult<
  TEventDetailResponse,
  TEventPayload
> => {
  return useMutation(createEvent);
};

export const useUpdateEvent = (): TExpectMutationResult<
  TEventDetailResponse,
  TUpdateParams<TEventResponse['id'], TEventPayload>
> => {
  return useMutation(updateEvent);
};

export const useDeleteEvent = (): TExpectMutationResult<
  string,
  TEventResponse['id']
> => {
  return useMutation(deleteEvent);
};
