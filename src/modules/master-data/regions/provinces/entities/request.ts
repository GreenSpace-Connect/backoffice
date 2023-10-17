import { TDefaultParams } from '@/utils/entities/request';
import { TProvinceResponse } from './response';

export type TProvinceParams = TDefaultParams<TProvinceResponse> & {
  search?: string;
};

export type TProvincePayload = {
  name: string;
};
