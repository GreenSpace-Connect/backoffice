import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { TAuthSigninPayload, TAuthSignupPayload } from '../entities/request';
import { Form } from 'antd';
import { useAuthSignup } from './useQuery';
import { failedMessage, successMessage } from '@/services/antd/message';
import { setErrorForm } from '@/services/antd/form';

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

  const onLogin = async (values: TAuthSigninPayload) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.ok) {
      redirectAuth();
    }
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

  return { redirectAuth, form, onLogin, authSignupRegister, onRegister };
};
