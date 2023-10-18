import { TDefaultParams } from '@/utils/entities/request';
import { TCityResponse } from './response';
import { TProvinceResponse } from '../../provinces/entities/response';

export type TCityParams = TDefaultParams<TCityResponse> & {
  search?: string;
  provinceId?: number;
};

export type TCityPayload = {
  name: string;
  provinceId: TProvinceResponse['id'];
};
