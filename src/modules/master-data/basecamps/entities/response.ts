import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TCommunityResponse } from '../../communities/entities/response';
import { TGreenPlaceResponse } from '../../green-places/entities/response';

export type TBasecampResponse = {
  id: number;
  community: TCommunityResponse;
  greenPlace: TGreenPlaceResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TBasecampPaginateResponse = TPaginateResponse<TBasecampResponse>;

export type TBasecampDetailResponse = TResponseData<TBasecampResponse>;
