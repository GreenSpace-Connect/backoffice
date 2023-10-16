import {
  createUser,
  deleteUser,
  getUserDetails,
  getUsers,
  updateUser,
} from '../api';
import { TUserParams, TUserPayload } from '../entities/request';
import {
  TUserDetailResponse,
  TUserPaginateResponse,
  TUserResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetUsers = (
  value: TGetListHookParams<TUserParams, TUserPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-users', value.params],
    queryFn: () => getUsers(value.params),
    ...value.options,
  });
};

export const useGetUserDetails = (
  value: TGetDetailHookParams<TUserResponse['id'], TUserDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-user-details', value.id],
    queryFn: () => getUserDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateUser = (): TExpectMutationResult<
  TUserDetailResponse,
  TUserPayload
> => {
  return useMutation(createUser);
};

export const useUpdateUser = (): TExpectMutationResult<
  TUserDetailResponse,
  TUpdateParams<TUserResponse['id'], TUserPayload>
> => {
  return useMutation(updateUser);
};

export const useDeleteUser = (): TExpectMutationResult<
  string,
  TUserResponse['id']
> => {
  return useMutation(deleteUser);
};
