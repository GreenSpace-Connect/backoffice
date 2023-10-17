import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TRoleResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TRolePaginateResponse = TPaginateResponse<TRoleResponse>;

export type TRoleDetailResponse = TResponseData<TRoleResponse>;
