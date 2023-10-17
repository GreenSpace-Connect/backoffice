import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TProvincePaginateResponse,
  TProvinceResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TProvincePayload } from '../entities/request';
import {
  useCreateProvince,
  useDeleteProvince,
  useUpdateProvince,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useProvinceForm = (
  dataHook: TExpectQueryResult<TProvincePaginateResponse>,
) => {
  const [form] = Form.useForm<TProvincePayload>();

  const setFields = (record: TProvinceResponse) => {
    form.setFieldsValue({
      name: record.name,
    });
  };

  const createMutation = useCreateProvince();
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

  const updateMutation = useUpdateProvince();
  const onUpdate = (id: TProvinceResponse['id']) => {
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

  const deleteMutation = useDeleteProvince();
  const onDelete = (id: TProvinceResponse['id']) => {
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
