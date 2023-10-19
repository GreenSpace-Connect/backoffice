import {
  createCommunityUser,
  deleteCommunityUser,
  getCommunityUserDetails,
  getCommunityUsers,
  updateCommunityUser,
} from '../api';
import {
  TCommunityUserParams,
  TCommunityUserPayload,
} from '../entities/request';
import {
  TCommunityUserDetailResponse,
  TCommunityUserPaginateResponse,
  TCommunityUserResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetCommunityUsers = (
  value: TGetListHookParams<
    TCommunityUserParams,
    TCommunityUserPaginateResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-communityusers', value.params],
    queryFn: () => getCommunityUsers(value.params),
    ...value.options,
  });
};

export const useGetCommunityUserDetails = (
  value: TGetDetailHookParams<
    TCommunityUserResponse['id'],
    TCommunityUserDetailResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-communityuser-details', value.id],
    queryFn: () => getCommunityUserDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateCommunityUser = (): TExpectMutationResult<
  TCommunityUserDetailResponse,
  TCommunityUserPayload
> => {
  return useMutation(createCommunityUser);
};

export const useUpdateCommunityUser = (): TExpectMutationResult<
  TCommunityUserDetailResponse,
  TUpdateParams<TCommunityUserResponse['id'], TCommunityUserPayload>
> => {
  return useMutation(updateCommunityUser);
};

export const useDeleteCommunityUser = (): TExpectMutationResult<
  string,
  TCommunityUserResponse['id']
> => {
  return useMutation(deleteCommunityUser);
};
