import { Form, FormProps, Input } from 'antd';
import { TCommunityPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';

type FormManagementProps = FormProps<TCommunityPayload>;

export default function CommunityForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="PIC" name="picId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
    </Form>
  );
}
