import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TUserResponse } from '../../users/entities/response';
import { TGreenPlaceResponse } from '../../green-places/entities/response';

export type TComplaintResponse = {
  id: number;
  subject: string;
  description: string;
  user: TUserResponse;
  greenPlace: TGreenPlaceResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TComplaintPaginateResponse = TPaginateResponse<TComplaintResponse>;

export type TComplaintDetailResponse = TResponseData<TComplaintResponse>;
