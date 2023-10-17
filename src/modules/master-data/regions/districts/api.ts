import axios from '@/services/axios/axios';
import { MASTERDATA_DISTRICT_ENDPOINT } from './constant';
import { TDistrictParams, TDistrictPayload } from './entities/request';
import {
  TDistrictDetailResponse,
  TDistrictPaginateResponse,
  TDistrictResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getDistricts = async (params?: TDistrictParams) => {
  const result = await axios.get<TDistrictPaginateResponse>(
    `${MASTERDATA_DISTRICT_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getDistrictDetails = async (id: TDistrictResponse['id']) => {
  const result = await axios.get<TDistrictDetailResponse>(
    `${MASTERDATA_DISTRICT_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createDistrict = async (payload: TDistrictPayload) => {
  const result = await axios.post<TDistrictDetailResponse>(
    `${MASTERDATA_DISTRICT_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateDistrict = async (
  params: TUpdateParams<TDistrictResponse['id'], TDistrictPayload>,
) => {
  const result = await axios.patch<TDistrictDetailResponse>(
    `${MASTERDATA_DISTRICT_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteDistrict = async (id: TDistrictResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_DISTRICT_ENDPOINT}/${id}`,
  );
  return result.data;
};
