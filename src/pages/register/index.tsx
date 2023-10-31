import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthHelp } from '@/modules/auth/hooks/useAuthHelp';
import { emailRule, requiredRule } from '@/services/antd/validation';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import Link from 'next/link';

export default function RegisterPage() {
  const { redirectAuth, form, authSignupRegister, loadingLogin, onRegister } =
    useAuthHelp();

  redirectAuth();

  return (
    <DefaultLayout>
      <Form
        form={form}
        layout="vertical"
        onFinish={onRegister}
        style={{ maxWidth: '300px', margin: 'auto', padding: '3rem 0' }}
      >
        <Form.Item>
          <Typography.Title level={2}>Sign up</Typography.Title>
        </Form.Item>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[emailRule, requiredRule]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[requiredRule]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item label="Fullname" name="fullname" rules={[requiredRule]}>
            <Input placeholder="Fullname..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={authSignupRegister.isLoading || loadingLogin}
            >
              Register
            </Button>
          </Form.Item>

          <Typography.Text>
            Have account? <Link href="/login">here</Link>
          </Typography.Text>
        </Space>
      </Form>
    </DefaultLayout>
  );
}
