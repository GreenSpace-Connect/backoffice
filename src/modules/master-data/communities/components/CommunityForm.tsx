import { Form, FormProps, Input } from 'antd';
import { TCommunityPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import { OwnUpload } from '@/components/inputs/OwnUpload';
import { FilePlace } from '@/modules/upload/constant';
import { TCommunityResponse } from '../entities/response';

type FormManagementProps = FormProps<TCommunityPayload> & {
  picId?: TCommunityResponse['pic']['id'];
};

export default function CommunityForm(props: FormManagementProps) {
  const { form, picId, ...rest } = props;

  const watchForm = Form.useWatch<TCommunityPayload | undefined>([], form);

  return (
    <Form layout="vertical" form={form} {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item
        label="PIC"
        name="picId"
        rules={[requiredRule]}
        hidden={!!picId}
      >
        <UserSelect />
      </Form.Item>
      <Form.Item label="Photo" name="photo" rules={[requiredRule]}>
        <OwnUpload
          filePlace={FilePlace.Communities}
          defaultFile={watchForm?.photo}
          onUploaded={(filename) => form?.setFieldValue('photo', filename)}
        />
      </Form.Item>
    </Form>
  );
}
