import axios from '@/services/axios/axios';
import { MASTERDATA_COMMENT_ENDPOINT } from './constant';
import { TCommentParams, TCommentPayload } from './entities/request';
import {
  TCommentDetailResponse,
  TCommentPaginateResponse,
  TCommentResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getComments = async (params?: TCommentParams) => {
  const result = await axios.get<TCommentPaginateResponse>(
    `${MASTERDATA_COMMENT_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getCommentDetails = async (id: TCommentResponse['id']) => {
  const result = await axios.get<TCommentDetailResponse>(
    `${MASTERDATA_COMMENT_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createComment = async (payload: TCommentPayload) => {
  const result = await axios.post<TCommentDetailResponse>(
    `${MASTERDATA_COMMENT_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateComment = async (
  params: TUpdateParams<TCommentResponse['id'], TCommentPayload>,
) => {
  const result = await axios.patch<TCommentDetailResponse>(
    `${MASTERDATA_COMMENT_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteComment = async (id: TCommentResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_COMMENT_ENDPOINT}/${id}`,
  );
  return result.data;
};
