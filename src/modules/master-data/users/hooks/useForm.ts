import { TExpectQueryResult } from '@/utils/entities/hook';
import { TUserPaginateResponse, TUserResponse } from '../entities/response';
import { Form } from 'antd';
import { TUserPayload } from '../entities/request';
import { useCreateUser, useDeleteUser, useUpdateUser } from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useUserForm = (
  dataHook: TExpectQueryResult<TUserPaginateResponse>,
) => {
  const [form] = Form.useForm<TUserPayload>();

  const setFields = (record: TUserResponse) => {
    form.setFieldsValue({
      email: record.email,
      fullname: record.fullname,
      roleId: record.role.id,
      phoneNumber: record.phoneNumber,
      photo: record.photo,
    });
  };

  const createMutation = useCreateUser();
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

  const updateMutation = useUpdateUser();
  const onUpdate = (id: TUserResponse['id']) => {
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

  const deleteMutation = useDeleteUser();
  const onDelete = (id: TUserResponse['id']) => {
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
