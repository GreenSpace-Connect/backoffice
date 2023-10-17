import { Form, FormProps, Input } from 'antd';
import { TRolePayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';

type FormManagementProps = FormProps<TRolePayload>;

export default function RoleForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
    </Form>
  );
}
