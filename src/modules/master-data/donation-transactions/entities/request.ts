import { TDefaultParams } from '@/utils/entities/request';
import { TDonationTransactionResponse } from './response';
import { TDonationResponse } from '../../donations/entities/response';
import { TUserResponse } from '../../users/entities/response';

export type TDonationTransactionParams =
  TDefaultParams<TDonationTransactionResponse> & {
    search?: string;
    donationId?: TDonationResponse['id'];
    userId?: TUserResponse['id'];
  };

export type TDonationTransactionPayload = {
  donationId: TDonationResponse['id'];
  userId: TUserResponse['id'];
  amount: number;
};
