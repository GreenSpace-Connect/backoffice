import {
  createDistrict,
  deleteDistrict,
  getDistrictDetails,
  getDistricts,
  updateDistrict,
} from '../api';
import { TDistrictParams, TDistrictPayload } from '../entities/request';
import {
  TDistrictDetailResponse,
  TDistrictPaginateResponse,
  TDistrictResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetDistricts = (
  value: TGetListHookParams<TDistrictParams, TDistrictPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-districts', value.params],
    queryFn: () => getDistricts(value.params),
    ...value.options,
  });
};

export const useGetDistrictDetails = (
  value: TGetDetailHookParams<TDistrictResponse['id'], TDistrictDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-district-details', value.id],
    queryFn: () => getDistrictDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateDistrict = (): TExpectMutationResult<
  TDistrictDetailResponse,
  TDistrictPayload
> => {
  return useMutation(createDistrict);
};

export const useUpdateDistrict = (): TExpectMutationResult<
  TDistrictDetailResponse,
  TUpdateParams<TDistrictResponse['id'], TDistrictPayload>
> => {
  return useMutation(updateDistrict);
};

export const useDeleteDistrict = (): TExpectMutationResult<
  string,
  TDistrictResponse['id']
> => {
  return useMutation(deleteDistrict);
};
