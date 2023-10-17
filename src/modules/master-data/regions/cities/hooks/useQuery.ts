import {
  createCity,
  deleteCity,
  getCityDetails,
  getCities,
  updateCity,
} from '../api';
import { TCityParams, TCityPayload } from '../entities/request';
import {
  TCityDetailResponse,
  TCityPaginateResponse,
  TCityResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetCities = (
  value: TGetListHookParams<TCityParams, TCityPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-cities', value.params],
    queryFn: () => getCities(value.params),
    ...value.options,
  });
};

export const useGetCityDetails = (
  value: TGetDetailHookParams<TCityResponse['id'], TCityDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-city-details', value.id],
    queryFn: () => getCityDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateCity = (): TExpectMutationResult<
  TCityDetailResponse,
  TCityPayload
> => {
  return useMutation(createCity);
};

export const useUpdateCity = (): TExpectMutationResult<
  TCityDetailResponse,
  TUpdateParams<TCityResponse['id'], TCityPayload>
> => {
  return useMutation(updateCity);
};

export const useDeleteCity = (): TExpectMutationResult<
  string,
  TCityResponse['id']
> => {
  return useMutation(deleteCity);
};
