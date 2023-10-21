import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TEventResponse } from '../../events/entities/response';

export type TTicketResponse = {
  id: number;
  name: string;
  price: number;
  event: TEventResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TTicketPaginateResponse = TPaginateResponse<TTicketResponse>;

export type TTicketDetailResponse = TResponseData<TTicketResponse>;
