import axios from '@/services/axios/axios';
import { MASTERDATA_GREENPLACE_ENDPOINT } from './constant';
import { TGreenPlaceParams, TGreenPlacePayload } from './entities/request';
import {
  TGreenPlaceDetailResponse,
  TGreenPlacePaginateResponse,
  TGreenPlaceResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getGreenPlaces = async (params?: TGreenPlaceParams) => {
  const result = await axios.get<TGreenPlacePaginateResponse>(
    `${MASTERDATA_GREENPLACE_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getGreenPlaceDetails = async (id: TGreenPlaceResponse['id']) => {
  const result = await axios.get<TGreenPlaceDetailResponse>(
    `${MASTERDATA_GREENPLACE_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createGreenPlace = async (payload: TGreenPlacePayload) => {
  const result = await axios.post<TGreenPlaceDetailResponse>(
    `${MASTERDATA_GREENPLACE_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateGreenPlace = async (
  params: TUpdateParams<TGreenPlaceResponse['id'], TGreenPlacePayload>,
) => {
  const result = await axios.patch<TGreenPlaceDetailResponse>(
    `${MASTERDATA_GREENPLACE_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteGreenPlace = async (id: TGreenPlaceResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_GREENPLACE_ENDPOINT}/${id}`,
  );
  return result.data;
};
