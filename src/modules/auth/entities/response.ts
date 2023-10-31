import { TUserResponse } from '@/modules/master-data/users/entities/response';
import { TResponseData } from '@/utils/entities/response';

export type TAuthResponse = {
  user?: TUserResponse;
  accessToken: string;
};

export type TAuthSigninResponse = TResponseData<TAuthResponse>;

export type TAuthSignupResponse = TResponseData<TUserResponse>;
