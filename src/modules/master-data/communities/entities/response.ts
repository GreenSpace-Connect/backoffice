import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TUserResponse } from '../../users/entities/response';

export type TCommunityResponse = {
  id: number;
  photo: string;
  name: string;
  pic: TUserResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TCommunityPaginateResponse = TPaginateResponse<TCommunityResponse>;

export type TCommunityDetailResponse = TResponseData<TCommunityResponse>;
