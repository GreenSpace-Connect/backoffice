import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TDonationResponse } from '../../donations/entities/response';
import { TUserResponse } from '../../users/entities/response';

export type TDonationTransactionResponse = {
  id: number;
  donation: TDonationResponse;
  user: TUserResponse;
  amount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TDonationTransactionPaginateResponse =
  TPaginateResponse<TDonationTransactionResponse>;

export type TDonationTransactionDetailResponse =
  TResponseData<TDonationTransactionResponse>;
