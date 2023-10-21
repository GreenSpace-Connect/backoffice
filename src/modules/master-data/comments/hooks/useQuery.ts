import {
  createComment,
  deleteComment,
  getCommentDetails,
  getComments,
  updateComment,
} from '../api';
import { TCommentParams, TCommentPayload } from '../entities/request';
import {
  TCommentDetailResponse,
  TCommentPaginateResponse,
  TCommentResponse,
} from '../entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation, useQuery } from 'react-query';

export const useGetComments = (
  value: TGetListHookParams<TCommentParams, TCommentPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-comments', value.params],
    queryFn: () => getComments(value.params),
    ...value.options,
  });
};

export const useGetCommentDetails = (
  value: TGetDetailHookParams<TCommentResponse['id'], TCommentDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-comment-details', value.id],
    queryFn: () => getCommentDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateComment = (): TExpectMutationResult<
  TCommentDetailResponse,
  TCommentPayload
> => {
  return useMutation(createComment);
};

export const useUpdateComment = (): TExpectMutationResult<
  TCommentDetailResponse,
  TUpdateParams<TCommentResponse['id'], TCommentPayload>
> => {
  return useMutation(updateComment);
};

export const useDeleteComment = (): TExpectMutationResult<
  string,
  TCommentResponse['id']
> => {
  return useMutation(deleteComment);
};
