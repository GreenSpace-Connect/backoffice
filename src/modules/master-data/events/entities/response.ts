import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TCityResponse } from '../../regions/cities/entities/response';
import { TDistrictResponse } from '../../regions/districts/entities/response';
import { TProvinceResponse } from '../../regions/provinces/entities/response';
import { TCommunityResponse } from '../../communities/entities/response';

export type TEventResponse = {
  id: number;
  name: string;
  description: string;
  community: TCommunityResponse;
  thumbnail: string;
  schedule: string;
  placeName: string;
  address: string;
  latitude: string;
  longitude: string;
  province: TProvinceResponse;
  city: TCityResponse;
  district: TDistrictResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TEventPaginateResponse = TPaginateResponse<TEventResponse>;

export type TEventDetailResponse = TResponseData<TEventResponse>;
