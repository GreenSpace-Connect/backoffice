import { Form, FormProps, Input } from 'antd';
import { TComplaintPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import GreenPlaceSelect from '../../green-places/components/GreenPlaceSelect';

type FormManagementProps = FormProps<TComplaintPayload>;

export default function ComplaintForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Green Place" name="greenPlaceId" rules={[requiredRule]}>
        <GreenPlaceSelect />
      </Form.Item>
      <Form.Item label="User" name="userId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
      <Form.Item label="Subject" name="subject" rules={[requiredRule]}>
        <Input placeholder="Subject..." />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[requiredRule]}>
        <Input.TextArea placeholder="Description..." rows={6} />
      </Form.Item>
    </Form>
  );
}
