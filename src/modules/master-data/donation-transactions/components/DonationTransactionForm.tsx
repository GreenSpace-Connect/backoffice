import { Form, FormProps, InputNumber } from 'antd';
import { TDonationTransactionPayload } from '../entities/request';
import { requiredRule } from '@/services/antd/validation';
import DonationSelect from '../../donations/components/DonationSelect';
import UserSelect from '../../users/components/UserSelect';

type FormManagementProps = FormProps<TDonationTransactionPayload>;

export default function DonationTransactionForm(props: FormManagementProps) {
  const { ...rest } = props;

  return (
    <Form layout="vertical" {...rest}>
      <Form.Item label="Donation" name="donationId" rules={[requiredRule]}>
        <DonationSelect />
      </Form.Item>
      <Form.Item label="User" name="userId" rules={[requiredRule]}>
        <UserSelect />
      </Form.Item>
      <Form.Item label="Amount" name="amount" rules={[requiredRule]}>
        <InputNumber prefix="Rp " style={{ width: '100%' }} placeholder="..." />
      </Form.Item>
    </Form>
  );
}
