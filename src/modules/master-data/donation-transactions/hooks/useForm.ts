import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TDonationTransactionPaginateResponse,
  TDonationTransactionResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TDonationTransactionPayload } from '../entities/request';
import {
  useCreateDonationTransaction,
  useDeleteDonationTransaction,
  useUpdateDonationTransaction,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useDonationTransactionForm = (
  dataHook: TExpectQueryResult<TDonationTransactionPaginateResponse>,
) => {
  const [form] = Form.useForm<TDonationTransactionPayload>();

  const setFields = (record: TDonationTransactionResponse) => {
    form.setFieldsValue({
      donationId: record.donation.id,
      userId: record.user.id,
      amount: record.amount,
    });
  };

  const createMutation = useCreateDonationTransaction();
  const onCreate = () => {
    createMutation.mutate(form.getFieldsValue(), {
      onSuccess: () => {
        successMessage();
        dataHook.refetch();
      },
      onError: (data) => {
        failedMessage();
        setErrorForm(form, data.message);
      },
    });
  };

  const updateMutation = useUpdateDonationTransaction();
  const onUpdate = (id: TDonationTransactionResponse['id']) => {
    updateMutation.mutate(
      {
        id,
        payload: form.getFieldsValue(),
      },
      {
        onSuccess: () => {
          successMessage();
          dataHook.refetch();
        },
        onError: (data) => {
          failedMessage();
          setErrorForm(form, data.message);
          form.setFields([{ name: '' }]);
        },
      },
    );
  };

  const deleteMutation = useDeleteDonationTransaction();
  const onDelete = (id: TDonationTransactionResponse['id']) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        successMessage();
        dataHook.refetch();
      },
      onError: () => {
        failedMessage();
      },
    });
  };

  return {
    form,
    setFields,

    createMutation,
    onCreate,

    updateMutation,
    onUpdate,

    deleteMutation,
    onDelete,
  };
};
