import axios from '@/services/axios/axios';
import { MASTERDATA_BASECAMP_ENDPOINT } from './constant';
import { TBasecampParams, TBasecampPayload } from './entities/request';
import {
  TBasecampDetailResponse,
  TBasecampPaginateResponse,
  TBasecampResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getBasecamps = async (params?: TBasecampParams) => {
  const result = await axios.get<TBasecampPaginateResponse>(
    `${MASTERDATA_BASECAMP_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getBasecampDetails = async (id: TBasecampResponse['id']) => {
  const result = await axios.get<TBasecampDetailResponse>(
    `${MASTERDATA_BASECAMP_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createBasecamp = async (payload: TBasecampPayload) => {
  const result = await axios.post<TBasecampDetailResponse>(
    `${MASTERDATA_BASECAMP_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateBasecamp = async (
  params: TUpdateParams<TBasecampResponse['id'], TBasecampPayload>,
) => {
  const result = await axios.patch<TBasecampDetailResponse>(
    `${MASTERDATA_BASECAMP_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteBasecamp = async (id: TBasecampResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_BASECAMP_ENDPOINT}/${id}`,
  );
  return result.data;
};
