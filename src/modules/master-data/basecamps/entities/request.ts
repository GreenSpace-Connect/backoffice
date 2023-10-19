import { TDefaultParams } from '@/utils/entities/request';
import { TBasecampResponse } from './response';
import { TGreenPlaceResponse } from '../../green-places/entities/response';
import { TCommunityResponse } from '../../communities/entities/response';

export type TBasecampParams = TDefaultParams<TBasecampResponse> & {
  search?: string;
};

export type TBasecampPayload = {
  greenPlaceId: TGreenPlaceResponse['id'];
  communityId: TCommunityResponse['id'];
};
