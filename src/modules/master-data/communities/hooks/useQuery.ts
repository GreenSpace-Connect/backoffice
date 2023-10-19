import {
  createCommunity,
  deleteCommunity,
  getCommunityDetails,
  getCommunities,
  updateCommunity,
} from '../api';
import { TCommunityParams, TCommunityPayload } from '../entities/request';
import {
  TCommunityDetailResponse,
  TCommunityPaginateResponse,
  TCommunityResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetCommunities = (
  value: TGetListHookParams<TCommunityParams, TCommunityPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-communities', value.params],
    queryFn: () => getCommunities(value.params),
    ...value.options,
  });
};

export const useGetCommunityDetails = (
  value: TGetDetailHookParams<
    TCommunityResponse['id'],
    TCommunityDetailResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-community-details', value.id],
    queryFn: () => getCommunityDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateCommunity = (): TExpectMutationResult<
  TCommunityDetailResponse,
  TCommunityPayload
> => {
  return useMutation(createCommunity);
};

export const useUpdateCommunity = (): TExpectMutationResult<
  TCommunityDetailResponse,
  TUpdateParams<TCommunityResponse['id'], TCommunityPayload>
> => {
  return useMutation(updateCommunity);
};

export const useDeleteCommunity = (): TExpectMutationResult<
  string,
  TCommunityResponse['id']
> => {
  return useMutation(deleteCommunity);
};
