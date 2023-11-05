import { DatePicker, Form, FormProps, Input, InputNumber } from 'antd';
import { TDonationPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import EventSelect from '../../events/components/EventSelect';
import { TEventResponse } from '../../events/entities/response';

type FormManagementProps = FormProps<TDonationPayload> & {
  eventId?: TEventResponse['id'];
};

export default function DonationForm(props: FormManagementProps) {
  const { eventId, ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item
        label="Event"
        name="eventId"
        rules={[requiredRule]}
        hidden={!!eventId}
      >
        <EventSelect />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[requiredRule]}>
        <Input placeholder="Name..." />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[requiredRule]}>
        <Input.TextArea placeholder="Description..." rows={5} />
      </Form.Item>
      <Form.Item label="Start Date" name="startDate" rules={[requiredRule]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Ent Date" name="endDate" rules={[requiredRule]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Expect Donation"
        name="expectDonation"
        rules={[requiredRule]}
      >
        <InputNumber prefix="Rp " style={{ width: '100%' }} placeholder="..." />
      </Form.Item>
    </Form>
  );
}
