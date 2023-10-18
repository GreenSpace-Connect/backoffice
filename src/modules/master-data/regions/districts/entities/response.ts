import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TCityResponse } from '../../cities/entities/response';

export type TDistrictResponse = {
  id: number;
  name: string;
  city: TCityResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TDistrictPaginateResponse = TPaginateResponse<TDistrictResponse>;

export type TDistrictDetailResponse = TResponseData<TDistrictResponse>;
