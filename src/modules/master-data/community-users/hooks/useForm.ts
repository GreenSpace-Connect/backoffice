import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TCommunityUserPaginateResponse,
  TCommunityUserResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TCommunityUserPayload } from '../entities/request';
import {
  useCreateCommunityUser,
  useDeleteCommunityUser,
  useUpdateCommunityUser,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useCommunityUserForm = (
  dataHook?: TExpectQueryResult<TCommunityUserPaginateResponse>,
) => {
  const [form] = Form.useForm<TCommunityUserPayload>();

  const setFields = (record: TCommunityUserResponse) => {
    form.setFieldsValue({
      userId: record.user.id,
      communityId: record.community.id,
    });
  };

  const createMutation = useCreateCommunityUser();
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

  const updateMutation = useUpdateCommunityUser();
  const onUpdate = (id: TCommunityUserResponse['id']) => {
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

  const deleteMutation = useDeleteCommunityUser();
  const onDelete = (id: TCommunityUserResponse['id']) => {
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
