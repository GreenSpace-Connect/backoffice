import { Form, FormProps, Input } from 'antd';
import { TComplaintPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import GreenPlaceSelect from '../../green-places/components/GreenPlaceSelect';
import { TGreenPlaceResponse } from '../../green-places/entities/response';
import { TUserResponse } from '../../users/entities/response';

type FormManagementProps = FormProps<TComplaintPayload> & {
  greenPlaceId?: TGreenPlaceResponse['id'];
  userId?: TUserResponse['id'];
};

export default function ComplaintForm(props: FormManagementProps) {
  const { greenPlaceId, userId, ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item
        label="Green Place"
        name="greenPlaceId"
        rules={[requiredRule]}
        hidden={!!greenPlaceId}
      >
        <GreenPlaceSelect />
      </Form.Item>
      <Form.Item
        label="User"
        name="userId"
        rules={[requiredRule]}
        hidden={!!userId}
      >
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
