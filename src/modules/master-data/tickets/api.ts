import axios from '@/services/axios/axios';
import { MASTERDATA_TICKET_ENDPOINT } from './constant';
import { TTicketParams, TTicketPayload } from './entities/request';
import {
  TTicketDetailResponse,
  TTicketPaginateResponse,
  TTicketResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getTickets = async (params?: TTicketParams) => {
  const result = await axios.get<TTicketPaginateResponse>(
    `${MASTERDATA_TICKET_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getTicketDetails = async (id: TTicketResponse['id']) => {
  const result = await axios.get<TTicketDetailResponse>(
    `${MASTERDATA_TICKET_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createTicket = async (payload: TTicketPayload) => {
  const result = await axios.post<TTicketDetailResponse>(
    `${MASTERDATA_TICKET_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateTicket = async (
  params: TUpdateParams<TTicketResponse['id'], TTicketPayload>,
) => {
  const result = await axios.patch<TTicketDetailResponse>(
    `${MASTERDATA_TICKET_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteTicket = async (id: TTicketResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_TICKET_ENDPOINT}/${id}`,
  );
  return result.data;
};
