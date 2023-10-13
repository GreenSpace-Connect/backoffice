import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TUserResponse = {
  id: number;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TUserPaginateResponse = TPaginateResponse<TUserResponse>;

export type TUserDetailResponse = TResponseData<TUserResponse>;
