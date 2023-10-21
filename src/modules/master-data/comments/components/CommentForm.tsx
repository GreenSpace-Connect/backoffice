import { Form, FormProps, Input } from 'antd';
import { TCommentPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import EventSelect from '../../events/components/EventSelect';

type FormManagementProps = FormProps<TCommentPayload>;

export default function CommentForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Message" name="message" rules={[requiredRule]}>
        <Input.TextArea placeholder="Message..." rows={5} />
      </Form.Item>
      <Form.Item label="User" name="userId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
      <Form.Item label="Event" name="eventId" rules={[requiredRule]}>
        <EventSelect />
      </Form.Item>
    </Form>
  );
}
