import { Form, FormProps, InputNumber } from 'antd';
import { TDonationTransactionPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import DonationSelect from '../../donations/components/DonationSelect';
import UserSelect from '../../users/components/UserSelect';
import { TUserResponse } from '../../users/entities/response';
import { TDonationResponse } from '../../donations/entities/response';

type FormManagementProps = FormProps<TDonationTransactionPayload> & {
  userId?: TUserResponse['id'];
  donationId?: TDonationResponse['id'];
};

export default function DonationTransactionForm(props: FormManagementProps) {
  const { userId, donationId, ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item
        label="Donation"
        name="donationId"
        rules={[requiredRule]}
        hidden={!!donationId}
      >
        <DonationSelect />
      </Form.Item>
      <Form.Item
        label="User"
        name="userId"
        rules={[requiredRule]}
        hidden={!!userId}
      >
        <UserSelect />
      </Form.Item>
      <Form.Item label="Amount" name="amount" rules={[requiredRule]}>
        <InputNumber prefix="Rp " style={{ width: '100%' }} placeholder="..." />
      </Form.Item>
    </Form>
  );
}
