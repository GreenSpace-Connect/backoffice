import { TDefaultParams } from '@/utils/entities/request';
import { TTicketTransactionResponse } from './response';
import { TUserResponse } from '../../users/entities/response';
import { TTicketResponse } from '../../tickets/entities/response';

export type TTicketTransactionParams =
  TDefaultParams<TTicketTransactionResponse> & {
    search?: string;
    ticketId?: TTicketResponse['id'];
    userId?: TUserResponse['id'];
  };

export type TTicketTransactionPayload = {
  ticketId?: TTicketResponse['id'];
  userId: TUserResponse['id'];
};
