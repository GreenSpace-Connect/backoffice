import { Form, FormProps, Input } from 'antd';
import { TCommunityPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import { OwnUpload } from '@/components/inputs/OwnUpload';
import { FilePlace } from '@/modules/upload/constant';

type FormManagementProps = FormProps<TCommunityPayload>;

export default function CommunityForm(props: FormManagementProps) {
  const { form, ...rest } = props;

  const watchForm = Form.useWatch<TCommunityPayload | undefined>([], form);

  return (
    <Form layout="vertical" form={form} {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="PIC" name="picId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
      <Form.Item label="Thumbnail Url" name="thumbnail" rules={[requiredRule]}>
        <OwnUpload
          filePlace={FilePlace.Communities}
          defaultFile={watchForm?.photo}
          onUploaded={(filename) => form?.setFieldValue('photo', filename)}
        />
      </Form.Item>
    </Form>
  );
}
