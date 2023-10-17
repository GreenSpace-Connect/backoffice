import { Form, FormProps, Input } from 'antd';
import { TDistrictPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';

type FormManagementProps = FormProps<TDistrictPayload>;

export default function DistrictForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
    </Form>
  );
}
