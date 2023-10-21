import { TDefaultParams } from '@/utils/entities/request';
import { TTicketResponse } from './response';
import { TEventResponse } from '../../events/entities/response';

export type TTicketParams = TDefaultParams<TTicketResponse> & {
  search?: string;
  eventId?: TEventResponse['id'];
};

export type TTicketPayload = {
  name: string;
  price: number;
  eventId: TEventResponse['id'];
};
