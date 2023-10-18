import { TDefaultParams } from '@/utils/entities/request';
import { TGreenPlaceResponse } from './response';
import { TProvinceResponse } from '../../regions/provinces/entities/response';
import { TDistrictResponse } from '../../regions/districts/entities/response';
import { TCityResponse } from '../../regions/cities/entities/response';

export type TGreenPlaceParams = TDefaultParams<TGreenPlaceResponse> & {
  search?: string;
};

export type TGreenPlacePayload = {
  name: string;
  provinceId: TProvinceResponse['id'];
  cityId: TCityResponse['id'];
  districtId: TDistrictResponse['id'];
  address: string;
  latitude: string;
  longitude: string;
};
