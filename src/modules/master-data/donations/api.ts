import axios from '@/services/axios/axios';
import { MASTERDATA_DONATION_ENDPOINT } from './constant';
import { TDonationParams, TDonationPayload } from './entities/request';
import {
  TDonationDetailResponse,
  TDonationPaginateResponse,
  TDonationResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getDonations = async (params?: TDonationParams) => {
  const result = await axios.get<TDonationPaginateResponse>(
    `${MASTERDATA_DONATION_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getDonationDetails = async (id: TDonationResponse['id']) => {
  const result = await axios.get<TDonationDetailResponse>(
    `${MASTERDATA_DONATION_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createDonation = async (payload: TDonationPayload) => {
  const result = await axios.post<TDonationDetailResponse>(
    `${MASTERDATA_DONATION_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateDonation = async (
  params: TUpdateParams<TDonationResponse['id'], TDonationPayload>,
) => {
  const result = await axios.patch<TDonationDetailResponse>(
    `${MASTERDATA_DONATION_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteDonation = async (id: TDonationResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_DONATION_ENDPOINT}/${id}`,
  );
  return result.data;
};
