import { TExpectQueryResult } from '@/utils/entities/hook';
import { TTicketPaginateResponse, TTicketResponse } from '../entities/response';
import { Form } from 'antd';
import { TTicketPayload } from '../entities/request';
import { useCreateTicket, useDeleteTicket, useUpdateTicket } from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useTicketForm = (
  dataHook: TExpectQueryResult<TTicketPaginateResponse>,
) => {
  const [form] = Form.useForm<TTicketPayload>();

  const setFields = (record: TTicketResponse) => {
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      eventId: record.event.id,
    });
  };

  const createMutation = useCreateTicket();
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

  const updateMutation = useUpdateTicket();
  const onUpdate = (id: TTicketResponse['id']) => {
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

  const deleteMutation = useDeleteTicket();
  const onDelete = (id: TTicketResponse['id']) => {
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
