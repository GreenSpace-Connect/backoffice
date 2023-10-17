import {
  createProvince,
  deleteProvince,
  getProvinceDetails,
  getProvinces,
  updateProvince,
} from '../api';
import { TProvinceParams, TProvincePayload } from '../entities/request';
import {
  TProvinceDetailResponse,
  TProvincePaginateResponse,
  TProvinceResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetProvinces = (
  value: TGetListHookParams<TProvinceParams, TProvincePaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-provinces', value.params],
    queryFn: () => getProvinces(value.params),
    ...value.options,
  });
};

export const useGetProvinceDetails = (
  value: TGetDetailHookParams<TProvinceResponse['id'], TProvinceDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-province-details', value.id],
    queryFn: () => getProvinceDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateProvince = (): TExpectMutationResult<
  TProvinceDetailResponse,
  TProvincePayload
> => {
  return useMutation(createProvince);
};

export const useUpdateProvince = (): TExpectMutationResult<
  TProvinceDetailResponse,
  TUpdateParams<TProvinceResponse['id'], TProvincePayload>
> => {
  return useMutation(updateProvince);
};

export const useDeleteProvince = (): TExpectMutationResult<
  string,
  TProvinceResponse['id']
> => {
  return useMutation(deleteProvince);
};
