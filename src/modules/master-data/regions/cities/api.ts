import axios from '@/services/axios/axios';
import { MASTERDATA_CITY_ENDPOINT } from './constant';
import { TCityParams, TCityPayload } from './entities/request';
import {
  TCityDetailResponse,
  TCityPaginateResponse,
  TCityResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getCities = async (params?: TCityParams) => {
  const result = await axios.get<TCityPaginateResponse>(
    `${MASTERDATA_CITY_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getCityDetails = async (id: TCityResponse['id']) => {
  const result = await axios.get<TCityDetailResponse>(
    `${MASTERDATA_CITY_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createCity = async (payload: TCityPayload) => {
  const result = await axios.post<TCityDetailResponse>(
    `${MASTERDATA_CITY_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateCity = async (
  params: TUpdateParams<TCityResponse['id'], TCityPayload>,
) => {
  const result = await axios.patch<TCityDetailResponse>(
    `${MASTERDATA_CITY_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteCity = async (id: TCityResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_CITY_ENDPOINT}/${id}`,
  );
  return result.data;
};
