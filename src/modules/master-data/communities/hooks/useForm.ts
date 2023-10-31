import { TExpectQueryResult } from '@/utils/entities/hook';
import { TCommunityResponse } from '../entities/response';
import { Form } from 'antd';
import { TCommunityPayload } from '../entities/request';
import {
  useCreateCommunity,
  useDeleteCommunity,
  useUpdateCommunity,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useCommunityForm = <Response>(
  dataHook?: TExpectQueryResult<Response>,
) => {
  const [form] = Form.useForm<TCommunityPayload>();

  const setFields = (record: TCommunityResponse) => {
    form.setFieldsValue({
      name: record.name,
      picId: record.pic.id,
      photo: record.photo,
    });
  };

  const createMutation = useCreateCommunity();
  const onCreate = () => {
    createMutation.mutate(form.getFieldsValue(), {
      onSuccess: () => {
        successMessage();
        dataHook?.refetch();
      },
      onError: (data) => {
        failedMessage();
        setErrorForm(form, data.message);
      },
    });
  };

  const updateMutation = useUpdateCommunity();
  const onUpdate = (id: TCommunityResponse['id']) => {
    updateMutation.mutate(
      {
        id,
        payload: form.getFieldsValue(),
      },
      {
        onSuccess: () => {
          successMessage();
          dataHook?.refetch();
        },
        onError: (data) => {
          failedMessage();
          setErrorForm(form, data.message);
          form.setFields([{ name: '' }]);
        },
      },
    );
  };

  const deleteMutation = useDeleteCommunity();
  const onDelete = (id: TCommunityResponse['id']) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        successMessage();
        dataHook?.refetch();
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
