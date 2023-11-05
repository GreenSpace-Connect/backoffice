import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TEventResponse } from '../../events/entities/response';
import { TDonationTransactionResponse } from '../../donation-transactions/entities/response';

export type TDonationResponse = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  expectDonation: number;
  event: TEventResponse;
  donationTransaction: TDonationTransactionResponse[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TDonationPaginateResponse = TPaginateResponse<TDonationResponse>;

export type TDonationDetailResponse = TResponseData<TDonationResponse>;
