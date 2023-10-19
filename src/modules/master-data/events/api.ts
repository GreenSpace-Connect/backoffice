import axios from '@/services/axios/axios';
import { MASTERDATA_EVENT_ENDPOINT } from './constant';
import { TEventParams, TEventPayload } from './entities/request';
import {
  TEventDetailResponse,
  TEventPaginateResponse,
  TEventResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getEvents = async (params?: TEventParams) => {
  const result = await axios.get<TEventPaginateResponse>(
    `${MASTERDATA_EVENT_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getEventDetails = async (id: TEventResponse['id']) => {
  const result = await axios.get<TEventDetailResponse>(
    `${MASTERDATA_EVENT_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createEvent = async (payload: TEventPayload) => {
  const result = await axios.post<TEventDetailResponse>(
    `${MASTERDATA_EVENT_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateEvent = async (
  params: TUpdateParams<TEventResponse['id'], TEventPayload>,
) => {
  const result = await axios.patch<TEventDetailResponse>(
    `${MASTERDATA_EVENT_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteEvent = async (id: TEventResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_EVENT_ENDPOINT}/${id}`,
  );
  return result.data;
};
