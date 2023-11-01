import {
  createDonationTransaction,
  deleteDonationTransaction,
  getDonationTransactionDetails,
  getDonationTransactions,
  updateDonationTransaction,
} from '../api';
import {
  TDonationTransactionParams,
  TDonationTransactionPayload,
} from '../entities/request';
import {
  TDonationTransactionDetailResponse,
  TDonationTransactionPaginateResponse,
  TDonationTransactionResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetDonationTransactions = (
  value: TGetListHookParams<
    TDonationTransactionParams,
    TDonationTransactionPaginateResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-donationTransactions', value.params],
    queryFn: () => getDonationTransactions(value.params),
    ...value.options,
  });
};

export const useGetDonationTransactionDetails = (
  value: TGetDetailHookParams<
    TDonationTransactionResponse['id'],
    TDonationTransactionDetailResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-donationTransaction-details', value.id],
    queryFn: () => getDonationTransactionDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateDonationTransaction = (): TExpectMutationResult<
  TDonationTransactionDetailResponse,
  TDonationTransactionPayload
> => {
  return useMutation(createDonationTransaction);
};

export const useUpdateDonationTransaction = (): TExpectMutationResult<
  TDonationTransactionDetailResponse,
  TUpdateParams<TDonationTransactionResponse['id'], TDonationTransactionPayload>
> => {
  return useMutation(updateDonationTransaction);
};

export const useDeleteDonationTransaction = (): TExpectMutationResult<
  string,
  TDonationTransactionResponse['id']
> => {
  return useMutation(deleteDonationTransaction);
};
