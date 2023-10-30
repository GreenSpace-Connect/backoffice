import DefaultLayout from '@/layouts/DefaultLayout';
import { TAuthSigninPayload } from '@/modules/auth/entities/request';
import { emailRule, requiredRule } from '@/services/antd/validation';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Backoffice() {
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

  redirectAuth();

  const [form] = Form.useForm();
  const onFinish = async (values: TAuthSigninPayload) => {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.ok) {
      redirectAuth();
    }
  };

  return (
    <DefaultLayout>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: '300px', margin: 'auto', padding: '3rem 0' }}
      >
        <Form.Item>
          <Typography.Title level={2}>Sign in</Typography.Title>
        </Form.Item>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item name="email" rules={[emailRule, requiredRule]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" rules={[requiredRule]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign in
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </DefaultLayout>
  );
}
