import axios from '@/services/axios/axios';
import { MASTERDATA_USER_ENDPOINT } from './constant';
import { TUserParams, TUserPayload } from './entities/request';
import {
  TUserDetailResponse,
  TUserPaginateResponse,
  TUserResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getUsers = async (params?: TUserParams) => {
  const result = await axios.get<TUserPaginateResponse>(
    `${MASTERDATA_USER_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getUserDetails = async (id: TUserResponse['id']) => {
  const result = await axios.get<TUserDetailResponse>(
    `${MASTERDATA_USER_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createUser = async (payload: TUserPayload) => {
  const result = await axios.post<TUserDetailResponse>(
    `${MASTERDATA_USER_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateUser = async (
  params: TUpdateParams<TUserResponse['id'], TUserPayload>,
) => {
  const result = await axios.patch<TUserDetailResponse>(
    `${MASTERDATA_USER_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteUser = async (id: TUserResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_USER_ENDPOINT}/${id}`,
  );
  return result.data;
};
