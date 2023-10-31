import { Form, FormProps } from 'antd';
import { TCommunityUserPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import CommunitySelect from '../../communities/components/CommunitySelect';
import UserSelect from '../../users/components/UserSelect';
import { TCommunityResponse } from '../../communities/entities/response';
import { useEffect } from 'react';

type FormManagementProps = FormProps<TCommunityUserPayload> & {
  communityId?: TCommunityResponse['id'];
};

export default function CommunityUserForm(props: FormManagementProps) {
  const { form, communityId, ...rest } = props;

  useEffect(() => {
    if (communityId) {
      form?.setFieldValue('communityId', communityId);
    }
  }, [communityId]);

  return (
    <Form layout="vertical" form={form} {...rest}>
      {!communityId && (
        <Form.Item label="Community" name="communityId" rules={[requiredRule]}>
          <CommunitySelect />
        </Form.Item>
      )}
      <Form.Item label="User" name="userId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
    </Form>
  );
}
