import { TDefaultParams } from '@/utils/entities/request';
import { TEventResponse } from './response';
import { TCommunityResponse } from '../../communities/entities/response';
import { TCityResponse } from '../../regions/cities/entities/response';
import { TDistrictResponse } from '../../regions/districts/entities/response';
import { TProvinceResponse } from '../../regions/provinces/entities/response';

export type TEventParams = TDefaultParams<TEventResponse> & {
  search?: string;
  communityId?: TCommunityResponse['id'];
  provinceId?: TProvinceResponse['id'];
  cityId?: TCityResponse['id'];
  districtId?: TDistrictResponse['id'];
};

export type TEventPayload = {
  name: string;
  description: string;
  thumbnail: string;
  communityId: TCommunityResponse['id'];
  provinceId: TProvinceResponse['id'];
  cityId: TCityResponse['id'];
  districtId: TDistrictResponse['id'];
  placeName: string;
  address: string;
  latitude: string;
  longitude: string;
  schedule: Date;
};
