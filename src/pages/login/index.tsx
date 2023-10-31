import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthHelp } from '@/modules/auth/hooks/useAuthHelp';
import { emailRule, requiredRule } from '@/services/antd/validation';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import Link from 'next/link';

export default function LoginPage() {
  const { redirectAuth, form, loadingLogin, onLogin } = useAuthHelp();

  redirectAuth();

  return (
    <DefaultLayout>
      <Form
        form={form}
        layout="vertical"
        onFinish={onLogin}
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
            Don&apos;t have account? <Link href="/register">here</Link>
          </Typography.Text>
        </Space>
      </Form>
    </DefaultLayout>
  );
}
