import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TUserResponse } from '../../users/entities/response';
import { TEventResponse } from '../../events/entities/response';

export type TCommentResponse = {
  id: number;
  message: string;
  user: TUserResponse;
  event: TEventResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TCommentPaginateResponse = TPaginateResponse<TCommentResponse>;

export type TCommentDetailResponse = TResponseData<TCommentResponse>;
