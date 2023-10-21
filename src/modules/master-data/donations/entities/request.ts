import { TDefaultParams } from '@/utils/entities/request';
import { TDonationResponse } from './response';
import { TEventResponse } from '../../events/entities/response';

export type TDonationParams = TDefaultParams<TDonationResponse> & {
  search?: string;
  eventId?: TEventResponse['id'];
};

export type TDonationPayload = {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  expectDonation: number;
  eventId: TEventResponse['id'];
};
