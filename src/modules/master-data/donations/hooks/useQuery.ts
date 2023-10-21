import {
  createDonation,
  deleteDonation,
  getDonationDetails,
  getDonations,
  updateDonation,
} from '../api';
import { TDonationParams, TDonationPayload } from '../entities/request';
import {
  TDonationDetailResponse,
  TDonationPaginateResponse,
  TDonationResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetDonations = (
  value: TGetListHookParams<TDonationParams, TDonationPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-donations', value.params],
    queryFn: () => getDonations(value.params),
    ...value.options,
  });
};

export const useGetDonationDetails = (
  value: TGetDetailHookParams<TDonationResponse['id'], TDonationDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-donation-details', value.id],
    queryFn: () => getDonationDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateDonation = (): TExpectMutationResult<
  TDonationDetailResponse,
  TDonationPayload
> => {
  return useMutation(createDonation);
};

export const useUpdateDonation = (): TExpectMutationResult<
  TDonationDetailResponse,
  TUpdateParams<TDonationResponse['id'], TDonationPayload>
> => {
  return useMutation(updateDonation);
};

export const useDeleteDonation = (): TExpectMutationResult<
  string,
  TDonationResponse['id']
> => {
  return useMutation(deleteDonation);
};
