import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TComplaintPaginateResponse,
  TComplaintResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TComplaintPayload } from '../entities/request';
import {
  useCreateComplaint,
  useDeleteComplaint,
  useUpdateComplaint,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useComplaintForm = (
  dataHook: TExpectQueryResult<TComplaintPaginateResponse>,
) => {
  const [form] = Form.useForm<TComplaintPayload>();

  const setFields = (record: TComplaintResponse) => {
    form.setFieldsValue({
      subject: record.subject,
      description: record.description,
      userId: record.user.id,
      greenPlaceId: record.greenPlace.id,
    });
  };

  const createMutation = useCreateComplaint();
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

  const updateMutation = useUpdateComplaint();
  const onUpdate = (id: TComplaintResponse['id']) => {
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

  const deleteMutation = useDeleteComplaint();
  const onDelete = (id: TComplaintResponse['id']) => {
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
