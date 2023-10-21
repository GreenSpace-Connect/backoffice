import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TProvinceResponse } from '../../regions/provinces/entities/response';
import { TCityResponse } from '../../regions/cities/entities/response';
import { TDistrictResponse } from '../../regions/districts/entities/response';

export type TGreenPlaceResponse = {
  id: number;
  name: string;
  description: string;
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

export type TGreenPlacePaginateResponse =
  TPaginateResponse<TGreenPlaceResponse>;

export type TGreenPlaceDetailResponse = TResponseData<TGreenPlaceResponse>;
