import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TUserResponse } from '../../users/entities/response';
import { TCommunityResponse } from '../../communities/entities/response';

export type TCommunityUserResponse = {
  id: number;
  user: TUserResponse;
  community: TCommunityResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TCommunityUserPaginateResponse =
  TPaginateResponse<TCommunityUserResponse>;

export type TCommunityUserDetailResponse =
  TResponseData<TCommunityUserResponse>;
