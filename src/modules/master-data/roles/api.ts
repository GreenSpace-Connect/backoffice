import axios from '@/services/axios/axios';
import { MASTERDATA_ROLE_ENDPOINT } from './constant';
import { TRoleParams, TRolePayload } from './entities/request';
import {
  TRoleDetailResponse,
  TRolePaginateResponse,
  TRoleResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getRoles = async (params?: TRoleParams) => {
  const result = await axios.get<TRolePaginateResponse>(
    `${MASTERDATA_ROLE_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getRoleDetails = async (id: TRoleResponse['id']) => {
  const result = await axios.get<TRoleDetailResponse>(
    `${MASTERDATA_ROLE_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createRole = async (payload: TRolePayload) => {
  const result = await axios.post<TRoleDetailResponse>(
    `${MASTERDATA_ROLE_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateRole = async (
  params: TUpdateParams<TRoleResponse['id'], TRolePayload>,
) => {
  const result = await axios.patch<TRoleDetailResponse>(
    `${MASTERDATA_ROLE_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteRole = async (id: TRoleResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_ROLE_ENDPOINT}/${id}`,
  );
  return result.data;
};
