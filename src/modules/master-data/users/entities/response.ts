import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TRoleResponse } from '../../roles/entities/response';

export type TUserResponse = {
  id: number;
  fullname: string;
  email: string;
  role: TRoleResponse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TUserPaginateResponse = TPaginateResponse<TUserResponse>;

export type TUserDetailResponse = TResponseData<TUserResponse>;
