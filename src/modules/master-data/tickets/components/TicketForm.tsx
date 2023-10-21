import { Form, FormProps, Input, InputNumber } from 'antd';
import { TTicketPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import EventSelect from '../../events/components/EventSelect';

type FormManagementProps = FormProps<TTicketPayload>;

export default function TicketForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Event" name="eventId" rules={[requiredRule]}>
        <EventSelect />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[requiredRule]}>
        <InputNumber prefix="Rp " style={{ width: '100%' }} placeholder="..." />
      </Form.Item>
    </Form>
  );
}
