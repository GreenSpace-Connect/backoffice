import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TDistrictPaginateResponse,
  TDistrictResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TDistrictPayload } from '../entities/request';
import {
  useCreateDistrict,
  useDeleteDistrict,
  useUpdateDistrict,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useDistrictForm = (
  dataHook: TExpectQueryResult<TDistrictPaginateResponse>,
) => {
  const [form] = Form.useForm<TDistrictPayload>();

  const setFields = (record: TDistrictResponse) => {
    form.setFieldsValue({
      name: record.name,
    });
  };

  const createMutation = useCreateDistrict();
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

  const updateMutation = useUpdateDistrict();
  const onUpdate = (id: TDistrictResponse['id']) => {
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

  const deleteMutation = useDeleteDistrict();
  const onDelete = (id: TDistrictResponse['id']) => {
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
