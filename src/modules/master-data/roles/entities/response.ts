import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TRoleResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TRolePaginateResponse = TPaginateResponse<TRoleResponse>;

export type TRoleDetailResponse = TResponseData<TRoleResponse>;
