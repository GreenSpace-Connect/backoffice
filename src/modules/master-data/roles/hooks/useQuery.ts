import {
  createRole,
  deleteRole,
  getRoleDetails,
  getRoles,
  updateRole,
} from '../api';
import { TRoleParams, TRolePayload } from '../entities/request';
import {
  TRoleDetailResponse,
  TRolePaginateResponse,
  TRoleResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetRoles = (
  value: TGetListHookParams<TRoleParams, TRolePaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-roles', value.params],
    queryFn: () => getRoles(value.params),
    ...value.options,
  });
};

export const useGetRoleDetails = (
  value: TGetDetailHookParams<TRoleResponse['id'], TRoleDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-role-details', value.id],
    queryFn: () => getRoleDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateRole = (): TExpectMutationResult<
  TRoleDetailResponse,
  TRolePayload
> => {
  return useMutation(createRole);
};

export const useUpdateRole = (): TExpectMutationResult<
  TRoleDetailResponse,
  TUpdateParams<TRoleResponse['id'], TRolePayload>
> => {
  return useMutation(updateRole);
};

export const useDeleteRole = (): TExpectMutationResult<
  string,
  TRoleResponse['id']
> => {
  return useMutation(deleteRole);
};
