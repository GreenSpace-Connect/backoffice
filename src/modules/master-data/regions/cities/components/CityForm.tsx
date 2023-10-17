import { Form, FormProps, Input } from 'antd';
import { TCityPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import ProvinceSelect from '../../provinces/components/ProvinceSelect';

type FormManagementProps = FormProps<TCityPayload>;

export default function CityForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Province" name="provinceId" rules={[requiredRule]}>
        <ProvinceSelect />
      </Form.Item>
    </Form>
  );
}
