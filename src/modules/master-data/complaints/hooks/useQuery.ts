import {
  createComplaint,
  deleteComplaint,
  getComplaintDetails,
  getComplaints,
  updateComplaint,
} from '../api';
import { TComplaintParams, TComplaintPayload } from '../entities/request';
import {
  TComplaintDetailResponse,
  TComplaintPaginateResponse,
  TComplaintResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetComplaints = (
  value: TGetListHookParams<TComplaintParams, TComplaintPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-complaints', value.params],
    queryFn: () => getComplaints(value.params),
    ...value.options,
  });
};

export const useGetComplaintDetails = (
  value: TGetDetailHookParams<
    TComplaintResponse['id'],
    TComplaintDetailResponse
  >,
) => {
  return useQuery({
    queryKey: ['get-masterdata-complaint-details', value.id],
    queryFn: () => getComplaintDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateComplaint = (): TExpectMutationResult<
  TComplaintDetailResponse,
  TComplaintPayload
> => {
  return useMutation(createComplaint);
};

export const useUpdateComplaint = (): TExpectMutationResult<
  TComplaintDetailResponse,
  TUpdateParams<TComplaintResponse['id'], TComplaintPayload>
> => {
  return useMutation(updateComplaint);
};

export const useDeleteComplaint = (): TExpectMutationResult<
  string,
  TComplaintResponse['id']
> => {
  return useMutation(deleteComplaint);
};
