import { TDefaultParams } from '@/utils/entities/request';
import { TRoleResponse } from './response';

export type TRoleParams = TDefaultParams<TRoleResponse> & {
  search?: string;
};

export type TRolePayload = {
  name: string;
};
