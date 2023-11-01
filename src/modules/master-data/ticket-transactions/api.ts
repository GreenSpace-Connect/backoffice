import axios from '@/services/axios/axios';
import { MASTERDATA_TICKETTRANSACTON_ENDPOINT } from './constant';
import {
  TTicketTransactionParams,
  TTicketTransactionPayload,
} from './entities/request';
import {
  TTicketTransactionDetailResponse,
  TTicketTransactionPaginateResponse,
  TTicketTransactionResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getTicketTransactions = async (
  params?: TTicketTransactionParams,
) => {
  const result = await axios.get<TTicketTransactionPaginateResponse>(
    `${MASTERDATA_TICKETTRANSACTON_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getTicketTransactionDetails = async (
  id: TTicketTransactionResponse['id'],
) => {
  const result = await axios.get<TTicketTransactionDetailResponse>(
    `${MASTERDATA_TICKETTRANSACTON_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createTicketTransaction = async (
  payload: TTicketTransactionPayload,
) => {
  const result = await axios.post<TTicketTransactionDetailResponse>(
    `${MASTERDATA_TICKETTRANSACTON_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateTicketTransaction = async (
  params: TUpdateParams<
    TTicketTransactionResponse['id'],
    TTicketTransactionPayload
  >,
) => {
  const result = await axios.patch<TTicketTransactionDetailResponse>(
    `${MASTERDATA_TICKETTRANSACTON_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteTicketTransaction = async (
  id: TTicketTransactionResponse['id'],
) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_TICKETTRANSACTON_ENDPOINT}/${id}`,
  );
  return result.data;
};
