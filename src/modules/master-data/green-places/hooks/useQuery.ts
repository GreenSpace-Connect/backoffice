import {
  createGreenPlace,
  deleteGreenPlace,
  getGreenPlaceDetails,
  getGreenPlaces,
  updateGreenPlace,
} from '../api';
import { TGreenPlaceParams, TGreenPlacePayload } from '../entities/request';
import {
  TGreenPlaceDetailResponse,
  TGreenPlacePaginateResponse,
  TGreenPlaceResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetGreenPlaces = (
  value: TGetListHookParams<TGreenPlaceParams, TGreenPlacePaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-greenPlaces', value.params],
    queryFn: () => getGreenPlaces(value.params),
    ...value.options,
  });
};

export const useGetGreenPlaceDetails = (
  value: TGetDetailHookParams<
    TGreenPlaceResponse['id'],
    TGreenPlaceDetailResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-greenPlace-details', value.id],
    queryFn: () => getGreenPlaceDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateGreenPlace = (): TExpectMutationResult<
  TGreenPlaceDetailResponse,
  TGreenPlacePayload
> => {
  return useMutation(createGreenPlace);
};

export const useUpdateGreenPlace = (): TExpectMutationResult<
  TGreenPlaceDetailResponse,
  TUpdateParams<TGreenPlaceResponse['id'], TGreenPlacePayload>
> => {
  return useMutation(updateGreenPlace);
};

export const useDeleteGreenPlace = (): TExpectMutationResult<
  string,
  TGreenPlaceResponse['id']
> => {
  return useMutation(deleteGreenPlace);
};
