import { TRoleResponse } from '@/modules/master-data/roles/entities/response';

export type TAuthSigninPayload = {
  email: string;
  password: string;
};

export type TAuthSignupPayload = {
  email: string;
  password: string;
  fullname: string;
  roleId: TRoleResponse['id'];
  photo: string;
  phoneNumber: string;
};
