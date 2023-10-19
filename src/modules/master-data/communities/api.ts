import axios from '@/services/axios/axios';
import { MASTERDATA_COMMUNITY_ENDPOINT } from './constant';
import { TCommunityParams, TCommunityPayload } from './entities/request';
import {
  TCommunityDetailResponse,
  TCommunityPaginateResponse,
  TCommunityResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getCommunities = async (params?: TCommunityParams) => {
  const result = await axios.get<TCommunityPaginateResponse>(
    `${MASTERDATA_COMMUNITY_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getCommunityDetails = async (id: TCommunityResponse['id']) => {
  const result = await axios.get<TCommunityDetailResponse>(
    `${MASTERDATA_COMMUNITY_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createCommunity = async (payload: TCommunityPayload) => {
  const result = await axios.post<TCommunityDetailResponse>(
    `${MASTERDATA_COMMUNITY_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateCommunity = async (
  params: TUpdateParams<TCommunityResponse['id'], TCommunityPayload>,
) => {
  const result = await axios.patch<TCommunityDetailResponse>(
    `${MASTERDATA_COMMUNITY_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteCommunity = async (id: TCommunityResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_COMMUNITY_ENDPOINT}/${id}`,
  );
  return result.data;
};
