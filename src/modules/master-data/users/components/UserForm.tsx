import { Form, FormProps, Input } from 'antd';
import { TUserPayload } from '../entities/request';
import { emailRule, requiredRule } from '@/services/antd/validation';
import RoleSelect from '../../roles/components/RoleSelect';

type FormManagementProps = FormProps<TUserPayload>;

export default function UserForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Email" name="email" rules={[requiredRule, emailRule]}>
        <Input placeholder="Email..." />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[requiredRule]}>
        <Input.Password placeholder="Passowrd..." />
      </Form.Item>
      <Form.Item label="Fullname" name="fullname" rules={[requiredRule]}>
        <Input placeholder="Fullname..." />
      </Form.Item>
      <Form.Item label="Role" name="roleId" rules={[requiredRule]}>
        <RoleSelect />
      </Form.Item>
    </Form>
  );
}
