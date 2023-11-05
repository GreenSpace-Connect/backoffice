import { Form, FormProps } from 'antd';
import { TTicketTransactionPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import UserSelect from '../../users/components/UserSelect';
import TicketSelect from '../../tickets/components/TicketSelect';
import { TTicketResponse } from '../../tickets/entities/response';
import { TUserResponse } from '../../users/entities/response';

type FormManagementProps = FormProps<TTicketTransactionPayload> & {
  ticketId?: TTicketResponse['id'];
  userId?: TUserResponse['id'];
};

export default function TicketTransactionForm(props: FormManagementProps) {
  const { ticketId, userId, ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item
        label="Ticket"
        name="ticketId"
        rules={[requiredRule]}
        hidden={!!ticketId}
      >
        <TicketSelect />
      </Form.Item>
      <Form.Item
        label="User"
        name="userId"
        rules={[requiredRule]}
        hidden={!!userId}
      >
        <UserSelect />
      </Form.Item>
    </Form>
  );
}
