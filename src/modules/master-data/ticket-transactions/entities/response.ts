import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TUserResponse } from '../../users/entities/response';
import { TTicketResponse } from '../../tickets/entities/response';

export type TTicketTransactionResponse = {
  id: number;
  ticket: TTicketResponse;
  user: TUserResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TTicketTransactionPaginateResponse =
  TPaginateResponse<TTicketTransactionResponse>;

export type TTicketTransactionDetailResponse =
  TResponseData<TTicketTransactionResponse>;
