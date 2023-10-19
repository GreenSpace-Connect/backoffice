import {
  createBasecamp,
  deleteBasecamp,
  getBasecampDetails,
  getBasecamps,
  updateBasecamp,
} from '../api';
import { TBasecampParams, TBasecampPayload } from '../entities/request';
import {
  TBasecampDetailResponse,
  TBasecampPaginateResponse,
  TBasecampResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetBasecamps = (
  value: TGetListHookParams<TBasecampParams, TBasecampPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-basecamps', value.params],
    queryFn: () => getBasecamps(value.params),
    ...value.options,
  });
};

export const useGetBasecampDetails = (
  value: TGetDetailHookParams<TBasecampResponse['id'], TBasecampDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-basecamp-details', value.id],
    queryFn: () => getBasecampDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateBasecamp = (): TExpectMutationResult<
  TBasecampDetailResponse,
  TBasecampPayload
> => {
  return useMutation(createBasecamp);
};

export const useUpdateBasecamp = (): TExpectMutationResult<
  TBasecampDetailResponse,
  TUpdateParams<TBasecampResponse['id'], TBasecampPayload>
> => {
  return useMutation(updateBasecamp);
};

export const useDeleteBasecamp = (): TExpectMutationResult<
  string,
  TBasecampResponse['id']
> => {
  return useMutation(deleteBasecamp);
};
