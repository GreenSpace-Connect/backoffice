import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TBasecampPaginateResponse,
  TBasecampResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TBasecampPayload } from '../entities/request';
import {
  useCreateBasecamp,
  useDeleteBasecamp,
  useUpdateBasecamp,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useBasecampForm = (
  dataHook: TExpectQueryResult<TBasecampPaginateResponse>,
) => {
  const [form] = Form.useForm<TBasecampPayload>();

  const setFields = (record: TBasecampResponse) => {
    form.setFieldsValue({
      greenPlaceId: record.greenPlace.id,
      communityId: record.community.id,
    });
  };

  const createMutation = useCreateBasecamp();
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

  const updateMutation = useUpdateBasecamp();
  const onUpdate = (id: TBasecampResponse['id']) => {
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

  const deleteMutation = useDeleteBasecamp();
  const onDelete = (id: TBasecampResponse['id']) => {
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
