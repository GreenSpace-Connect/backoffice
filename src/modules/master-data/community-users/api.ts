import axios from '@/services/axios/axios';
import { MASTERDATA_COMMUNITYUSER_ENDPOINT } from './constant';
import {
  TCommunityUserParams,
  TCommunityUserPayload,
} from './entities/request';
import {
  TCommunityUserDetailResponse,
  TCommunityUserPaginateResponse,
  TCommunityUserResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getCommunityUsers = async (params?: TCommunityUserParams) => {
  const result = await axios.get<TCommunityUserPaginateResponse>(
    `${MASTERDATA_COMMUNITYUSER_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getCommunityUserDetails = async (
  id: TCommunityUserResponse['id'],
) => {
  const result = await axios.get<TCommunityUserDetailResponse>(
    `${MASTERDATA_COMMUNITYUSER_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createCommunityUser = async (payload: TCommunityUserPayload) => {
  const result = await axios.post<TCommunityUserDetailResponse>(
    `${MASTERDATA_COMMUNITYUSER_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateCommunityUser = async (
  params: TUpdateParams<TCommunityUserResponse['id'], TCommunityUserPayload>,
) => {
  const result = await axios.patch<TCommunityUserDetailResponse>(
    `${MASTERDATA_COMMUNITYUSER_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteCommunityUser = async (id: TCommunityUserResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_COMMUNITYUSER_ENDPOINT}/${id}`,
  );
  return result.data;
};
