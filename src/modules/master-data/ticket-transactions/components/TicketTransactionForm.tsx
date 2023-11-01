import { Form, FormProps } from 'antd';
import { TTicketTransactionPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import TicketSelect from '../../tickets/components/TicketSelect';

type FormManagementProps = FormProps<TTicketTransactionPayload>;

export default function TicketTransactionForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Ticket" name="ticketId" rules={[requiredRule]}>
        <TicketSelect />
      </Form.Item>
      <Form.Item label="User" name="userId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
    </Form>
  );
}
