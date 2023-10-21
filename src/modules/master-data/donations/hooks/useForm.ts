import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TDonationPaginateResponse,
  TDonationResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TDonationPayload } from '../entities/request';
import {
  useCreateDonation,
  useDeleteDonation,
  useUpdateDonation,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';
import dayjs from 'dayjs';

export const useDonationForm = (
  dataHook: TExpectQueryResult<TDonationPaginateResponse>,
) => {
  const [form] = Form.useForm<TDonationPayload>();

  const setFields = (record: TDonationResponse) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      eventId: record.event.id,
      startDate: dayjs(record.startDate),
      endDate: dayjs(record.endDate),
      expectDonation: record.expectDonation,
    });
  };

  const createMutation = useCreateDonation();
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

  const updateMutation = useUpdateDonation();
  const onUpdate = (id: TDonationResponse['id']) => {
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

  const deleteMutation = useDeleteDonation();
  const onDelete = (id: TDonationResponse['id']) => {
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
