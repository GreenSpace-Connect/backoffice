import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TProvinceResponse } from '../../provinces/entities/response';

export type TCityResponse = {
  id: string;
  name: string;
  province: TProvinceResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TCityPaginateResponse = TPaginateResponse<TCityResponse>;

export type TCityDetailResponse = TResponseData<TCityResponse>;
