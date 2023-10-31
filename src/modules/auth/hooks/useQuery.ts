import { TExpectMutationResult } from '@/utils/entities/hook';
import { useMutation } from 'react-query';
import { TAuthSignupPayload } from '../entities/request';
import { TAuthSignupResponse } from '../entities/response';
import { authSignup } from '../api';

export const useAuthSignup = (): TExpectMutationResult<
  TAuthSignupResponse,
  TAuthSignupPayload
> => {
  return useMutation(authSignup);
};
