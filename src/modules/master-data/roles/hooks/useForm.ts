import { TExpectQueryResult } from '@/utils/entities/hook';
import { TRolePaginateResponse, TRoleResponse } from '../entities/response';
import { Form } from 'antd';
import { TRolePayload } from '../entities/request';
import { useCreateRole, useDeleteRole, useUpdateRole } from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useRoleForm = (
  dataHook: TExpectQueryResult<TRolePaginateResponse>,
) => {
  const [form] = Form.useForm<TRolePayload>();

  const setFields = (record: TRoleResponse) => {
    form.setFieldsValue({
      name: record.name,
    });
  };

  const createMutation = useCreateRole();
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

  const updateMutation = useUpdateRole();
  const onUpdate = (id: TRoleResponse['id']) => {
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

  const deleteMutation = useDeleteRole();
  const onDelete = (id: TRoleResponse['id']) => {
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
