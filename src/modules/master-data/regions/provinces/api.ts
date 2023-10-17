import axios from '@/services/axios/axios';
import { MASTERDATA_PROVINCE_ENDPOINT } from './constant';
import { TProvinceParams, TProvincePayload } from './entities/request';
import {
  TProvinceDetailResponse,
  TProvincePaginateResponse,
  TProvinceResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getProvinces = async (params?: TProvinceParams) => {
  const result = await axios.get<TProvincePaginateResponse>(
    `${MASTERDATA_PROVINCE_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getProvinceDetails = async (id: TProvinceResponse['id']) => {
  const result = await axios.get<TProvinceDetailResponse>(
    `${MASTERDATA_PROVINCE_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createProvince = async (payload: TProvincePayload) => {
  const result = await axios.post<TProvinceDetailResponse>(
    `${MASTERDATA_PROVINCE_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateProvince = async (
  params: TUpdateParams<TProvinceResponse['id'], TProvincePayload>,
) => {
  const result = await axios.patch<TProvinceDetailResponse>(
    `${MASTERDATA_PROVINCE_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteProvince = async (id: TProvinceResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_PROVINCE_ENDPOINT}/${id}`,
  );
  return result.data;
};
