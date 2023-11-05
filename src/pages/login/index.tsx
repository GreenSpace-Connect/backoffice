import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthHelp } from '@/modules/auth/hooks/useAuthHelp';
import { emailRule, requiredRule } from '@/services/antd/validation';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import Link from 'next/link';

export default function LoginPage() {
  const { redirectAuth, form, loadingLogin, errorMessage, onLogin } =
    useAuthHelp();

  redirectAuth();

  return (
    <DefaultLayout>
      <Card
        style={{
          maxWidth: '480px',
          margin: 'auto',
          marginTop: '2rem',
          boxShadow:
            '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onLogin}
          style={{ maxWidth: '300px', margin: 'auto', padding: '3rem 0' }}
        >
          <Form.Item>
            <Link href="/">GreenSpace Connect</Link>
            <Typography.Title level={2}>Sign in</Typography.Title>
          </Form.Item>

          <Space direction="vertical" style={{ width: '100%' }}>
            <Form.Item name="email" rules={[emailRule, requiredRule]}>
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[requiredRule]}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Typography.Text type="danger">{errorMessage}</Typography.Text>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loadingLogin}
              >
                Sign in
              </Button>
            </Form.Item>

            <Typography.Text>
              Don&apos;t have account?{' '}
              <Link href="/register">register here</Link>
            </Typography.Text>
          </Space>
        </Form>
      </Card>
    </DefaultLayout>
  );
}
