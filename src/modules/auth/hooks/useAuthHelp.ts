import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TAuthSigninPayload, TAuthSignupPayload } from '../entities/request';
import { Form } from 'antd';
import { useAuthSignup } from './useQuery';
import { failedMessage, successMessage } from '@/services/antd/message';
import { setErrorForm } from '@/services/antd/form';
import { useState } from 'react';

export const useAuthHelp = () => {
  const session = useSession();
  const router = useRouter();

  const redirectAuth = () => {
    if (session.status === 'authenticated') {
      if (session.data.user?.role.name === 'admin') {
        router.push('/backoffice');
      } else {
        router.push('/');
      }
    }
  };

  const [form] = Form.useForm();

  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const onLogin = async (values: TAuthSigninPayload) => {
    setLoadingLogin(true);
    setErrorMessage('');

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.ok) {
      redirectAuth();
    }

    if (result?.error) {
      setErrorMessage(result?.error);
    }

    setLoadingLogin(false);
  };

  const authSignupRegister = useAuthSignup();
  const onRegister = (values: TAuthSignupPayload) => {
    authSignupRegister.mutate(values, {
      onSuccess: () => {
        successMessage();
        onLogin({
          email: values.email,
          password: values.password,
        });
      },
      onError: (data) => {
        failedMessage();
        setErrorForm(form, data.message);
      },
    });
  };

  return {
    redirectAuth,
    form,
    loadingLogin,
    errorMessage,
    onLogin,
    authSignupRegister,
    onRegister,
  };
};
