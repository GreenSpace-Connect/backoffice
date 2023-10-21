import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TCommentPaginateResponse,
  TCommentResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TCommentPayload } from '../entities/request';
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useCommentForm = (
  dataHook: TExpectQueryResult<TCommentPaginateResponse>,
) => {
  const [form] = Form.useForm<TCommentPayload>();

  const setFields = (record: TCommentResponse) => {
    form.setFieldsValue({
      message: record.message,
      eventId: record.event.id,
      userId: record.user.id,
    });
  };

  const createMutation = useCreateComment();
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

  const updateMutation = useUpdateComment();
  const onUpdate = (id: TCommentResponse['id']) => {
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

  const deleteMutation = useDeleteComment();
  const onDelete = (id: TCommentResponse['id']) => {
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
