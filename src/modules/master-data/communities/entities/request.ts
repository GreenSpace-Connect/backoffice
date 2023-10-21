import { TDefaultParams } from '@/utils/entities/request';
import { TCommunityResponse } from './response';
import { TUserResponse } from '../../users/entities/response';

export type TCommunityParams = TDefaultParams<TCommunityResponse> & {
  search?: string;
  picId?: TUserResponse['id'];
};

export type TCommunityPayload = {
  name: string;
  picId: TUserResponse['id'];
};
