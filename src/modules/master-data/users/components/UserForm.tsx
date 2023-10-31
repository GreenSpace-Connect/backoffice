import { Form, FormProps, Input } from 'antd';
import { TUserPayload } from '../entities/request';
import { emailRule, requiredRule } from '@/services/antd/validation';
import RoleSelect from '../../roles/components/RoleSelect';
import { OwnUpload } from '@/components/inputs/OwnUpload';
import { FilePlace } from '@/modules/upload/constant';

type FormManagementProps = FormProps<TUserPayload>;

export default function UserForm(props: FormManagementProps) {
  const { form, ...rest } = props;

  const watchForm = Form.useWatch<TUserPayload | undefined>([], form);

  return (
    <Form layout="vertical" form={form} {...rest}>
      <Form.Item label="Email" name="email" rules={[requiredRule, emailRule]}>
        <Input placeholder="Email..." />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[requiredRule]}>
        <Input.Password placeholder="Passowrd..." />
      </Form.Item>
      <Form.Item label="Fullname" name="fullname" rules={[requiredRule]}>
        <Input placeholder="Fullname..." />
      </Form.Item>
      <Form.Item label="Role" name="roleId" rules={[requiredRule]}>
        <RoleSelect />
      </Form.Item>
      <Form.Item label="Thumbnail Url" name="thumbnail" rules={[requiredRule]}>
        <OwnUpload
          filePlace={FilePlace.Avatars}
          defaultFile={watchForm?.photo}
          onUploaded={(filename) => form?.setFieldValue('photo', filename)}
        />
      </Form.Item>
      <Form.Item label="Phone Number" name="phoneNumber" rules={[requiredRule]}>
        <Input placeholder="Phone Number..." />
      </Form.Item>
    </Form>
  );
}
