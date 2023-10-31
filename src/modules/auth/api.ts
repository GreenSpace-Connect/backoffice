import {
  AUTH_SIGNINASADMIN_ENDPOINT,
  AUTH_SIGNIN_ENDPOINT,
  AUTH_SIGNUP_ENDPOINT,
} from './constant';
import { TAuthSigninResponse, TAuthSignupResponse } from './entities/response';
import { TAuthSigninPayload, TAuthSignupPayload } from './entities/request';
import axios from '@/services/axios/axios';

export const authSignin = async (payload: TAuthSigninPayload) => {
  const result = await axios.post<TAuthSigninResponse>(
    `${AUTH_SIGNIN_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const authSigninBackoffice = async (payload: TAuthSigninPayload) => {
  const result = await axios.post<TAuthSigninResponse>(
    `${AUTH_SIGNINASADMIN_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const authSignup = async (payload: TAuthSignupPayload) => {
  const result = await axios.post<TAuthSignupResponse>(
    `${AUTH_SIGNUP_ENDPOINT}`,
    payload,
  );
  return result.data;
};
