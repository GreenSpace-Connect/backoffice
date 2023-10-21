import { TDefaultParams } from '@/utils/entities/request';
import { TComplaintResponse } from './response';
import { TUserResponse } from '../../users/entities/response';
import { TGreenPlaceResponse } from '../../green-places/entities/response';

export type TComplaintParams = TDefaultParams<TComplaintResponse> & {
  search?: string;
};

export type TComplaintPayload = {
  subject: string;
  description: string;
  userId: TUserResponse['id'];
  greenPlaceId: TGreenPlaceResponse['id'];
};
