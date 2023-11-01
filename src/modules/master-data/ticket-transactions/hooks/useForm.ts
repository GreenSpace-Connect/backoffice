import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TTicketTransactionPaginateResponse,
  TTicketTransactionResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TTicketTransactionPayload } from '../entities/request';
import {
  useCreateTicketTransaction,
  useDeleteTicketTransaction,
  useUpdateTicketTransaction,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useTicketTransactionForm = (
  dataHook: TExpectQueryResult<TTicketTransactionPaginateResponse>,
) => {
  const [form] = Form.useForm<TTicketTransactionPayload>();

  const setFields = (record: TTicketTransactionResponse) => {
    form.setFieldsValue({
      ticketId: record.ticket.id,
      userId: record.user.id,
    });
  };

  const createMutation = useCreateTicketTransaction();
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

  const updateMutation = useUpdateTicketTransaction();
  const onUpdate = (id: TTicketTransactionResponse['id']) => {
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

  const deleteMutation = useDeleteTicketTransaction();
  const onDelete = (id: TTicketTransactionResponse['id']) => {
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
