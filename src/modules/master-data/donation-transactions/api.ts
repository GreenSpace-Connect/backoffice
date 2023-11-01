import axios from '@/services/axios/axios';
import { MASTERDATA_DONATIONTRANSACTON_ENDPOINT } from './constant';
import {
  TDonationTransactionParams,
  TDonationTransactionPayload,
} from './entities/request';
import {
  TDonationTransactionDetailResponse,
  TDonationTransactionPaginateResponse,
  TDonationTransactionResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getDonationTransactions = async (
  params?: TDonationTransactionParams,
) => {
  const result = await axios.get<TDonationTransactionPaginateResponse>(
    `${MASTERDATA_DONATIONTRANSACTON_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getDonationTransactionDetails = async (
  id: TDonationTransactionResponse['id'],
) => {
  const result = await axios.get<TDonationTransactionDetailResponse>(
    `${MASTERDATA_DONATIONTRANSACTON_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createDonationTransaction = async (
  payload: TDonationTransactionPayload,
) => {
  const result = await axios.post<TDonationTransactionDetailResponse>(
    `${MASTERDATA_DONATIONTRANSACTON_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateDonationTransaction = async (
  params: TUpdateParams<
    TDonationTransactionResponse['id'],
    TDonationTransactionPayload
  >,
) => {
  const result = await axios.patch<TDonationTransactionDetailResponse>(
    `${MASTERDATA_DONATIONTRANSACTON_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteDonationTransaction = async (
  id: TDonationTransactionResponse['id'],
) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_DONATIONTRANSACTON_ENDPOINT}/${id}`,
  );
  return result.data;
};
