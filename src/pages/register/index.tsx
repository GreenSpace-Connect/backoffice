import DefaultLayout from '@/layouts/DefaultLayout';
import { useAuthHelp } from '@/modules/auth/hooks/useAuthHelp';
import { emailRule, requiredRule } from '@/services/antd/validation';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography } from 'antd';
import Link from 'next/link';

export default function RegisterPage() {
  const { redirectAuth, form, authSignupRegister, loadingLogin, onRegister } =
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
          onFinish={onRegister}
          style={{ maxWidth: '300px', margin: 'auto', padding: '3rem 0' }}
        >
          <Form.Item>
            <Link href="/">GreenSpace Connect</Link>
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
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
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
              Have account? <Link href="/login">login here</Link>
            </Typography.Text>
          </Space>
        </Form>
      </Card>
    </DefaultLayout>
  );
}
