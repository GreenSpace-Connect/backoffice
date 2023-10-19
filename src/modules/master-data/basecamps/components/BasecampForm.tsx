import { Form, FormProps } from 'antd';
import { TBasecampPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import CommunitySelect from '../../communities/components/CommunitySelect';
import GreenPlaceSelect from '../../green-places/components/GreenPlaceSelect';

type FormManagementProps = FormProps<TBasecampPayload>;

export default function BasecampForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Community" name="communityId" rules={[requiredRule]}>
        <CommunitySelect />
      </Form.Item>
      <Form.Item label="Green Place" name="greenPlaceId" rules={[requiredRule]}>
        <GreenPlaceSelect />
      </Form.Item>
    </Form>
  );
}
