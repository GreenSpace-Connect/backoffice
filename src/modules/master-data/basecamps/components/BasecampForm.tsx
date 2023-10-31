import { Form, FormProps } from 'antd';
import { TBasecampPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import CommunitySelect from '../../communities/components/CommunitySelect';
import GreenPlaceSelect from '../../green-places/components/GreenPlaceSelect';
import { TCommunityResponse } from '../../communities/entities/response';
import { useEffect } from 'react';

type FormManagementProps = FormProps<TBasecampPayload> & {
  communityId?: TCommunityResponse['id'];
};

export default function BasecampForm(props: FormManagementProps) {
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
      <Form.Item label="Green Place" name="greenPlaceId" rules={[requiredRule]}>
        <GreenPlaceSelect />
      </Form.Item>
    </Form>
  );
}
