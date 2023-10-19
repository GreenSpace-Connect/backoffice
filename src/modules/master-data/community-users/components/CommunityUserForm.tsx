import { Form, FormProps } from 'antd';
import { TCommunityUserPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import CommunitySelect from '../../communities/components/CommunitySelect';
import UserSelect from '../../users/components/UserSelect';

type FormManagementProps = FormProps<TCommunityUserPayload>;

export default function CommunityUserForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Community" name="communityId" rules={[requiredRule]}>
        <CommunitySelect />
      </Form.Item>
      <Form.Item label="User" name="userId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
    </Form>
  );
}
