import { TDefaultParams } from '@/utils/entities/request';
import { TCommentResponse } from './response';
import { TUserResponse } from '../../users/entities/response';
import { TEventResponse } from '../../events/entities/response';

export type TCommentParams = TDefaultParams<TCommentResponse> & {
  search?: string;
  userId?: TUserResponse['id'];
  eventId?: TEventResponse['id'];
};

export type TCommentPayload = {
  message: string;
  userId?: TUserResponse['id'];
  eventId?: TEventResponse['id'];
};
