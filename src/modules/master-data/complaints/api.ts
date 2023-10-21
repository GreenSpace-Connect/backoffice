import axios from '@/services/axios/axios';
import { MASTERDATA_COMPLAINT_ENDPOINT } from './constant';
import { TComplaintParams, TComplaintPayload } from './entities/request';
import {
  TComplaintDetailResponse,
  TComplaintPaginateResponse,
  TComplaintResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getComplaints = async (params?: TComplaintParams) => {
  const result = await axios.get<TComplaintPaginateResponse>(
    `${MASTERDATA_COMPLAINT_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getComplaintDetails = async (id: TComplaintResponse['id']) => {
  const result = await axios.get<TComplaintDetailResponse>(
    `${MASTERDATA_COMPLAINT_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createComplaint = async (payload: TComplaintPayload) => {
  const result = await axios.post<TComplaintDetailResponse>(
    `${MASTERDATA_COMPLAINT_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateComplaint = async (
  params: TUpdateParams<TComplaintResponse['id'], TComplaintPayload>,
) => {
  const result = await axios.patch<TComplaintDetailResponse>(
    `${MASTERDATA_COMPLAINT_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteComplaint = async (id: TComplaintResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_COMPLAINT_ENDPOINT}/${id}`,
  );
  return result.data;
};
