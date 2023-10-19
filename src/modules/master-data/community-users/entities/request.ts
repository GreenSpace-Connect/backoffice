import { TDefaultParams } from '@/utils/entities/request';
import { TCommunityUserResponse } from './response';
import { TUserResponse } from '../../users/entities/response';
import { TCommunityResponse } from '../../communities/entities/response';

export type TCommunityUserParams = TDefaultParams<TCommunityUserResponse> & {
  search?: string;
};

export type TCommunityUserPayload = {
  userId: TUserResponse['id'];
  communityId: TCommunityResponse['id'];
};
