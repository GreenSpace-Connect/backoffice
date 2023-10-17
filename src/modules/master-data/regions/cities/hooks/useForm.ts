import { TExpectQueryResult } from '@/utils/entities/hook';
import { TCityPaginateResponse, TCityResponse } from '../entities/response';
import { Form } from 'antd';
import { TCityPayload } from '../entities/request';
import { useCreateCity, useDeleteCity, useUpdateCity } from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useCityForm = (
  dataHook: TExpectQueryResult<TCityPaginateResponse>,
) => {
  const [form] = Form.useForm<TCityPayload>();

  const setFields = (record: TCityResponse) => {
    form.setFieldsValue({
      name: record.name,
      provinceId: record.province.id,
    });
  };

  const createMutation = useCreateCity();
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

  const updateMutation = useUpdateCity();
  const onUpdate = (id: TCityResponse['id']) => {
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

  const deleteMutation = useDeleteCity();
  const onDelete = (id: TCityResponse['id']) => {
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
