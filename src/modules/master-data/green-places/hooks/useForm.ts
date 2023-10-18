import { TExpectQueryResult } from '@/utils/entities/hook';
import {
  TGreenPlacePaginateResponse,
  TGreenPlaceResponse,
} from '../entities/response';
import { Form } from 'antd';
import { TGreenPlacePayload } from '../entities/request';
import {
  useCreateGreenPlace,
  useDeleteGreenPlace,
  useUpdateGreenPlace,
} from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';

export const useGreenPlaceForm = (
  dataHook: TExpectQueryResult<TGreenPlacePaginateResponse>,
) => {
  const [form] = Form.useForm<TGreenPlacePayload>();

  const setFields = (record: TGreenPlaceResponse) => {
    form.setFieldsValue({
      name: record.name,
      provinceId: record.province.id,
      cityId: record.city.id,
      districtId: record.district.id,
      address: record.address,
      latitude: record.latitude,
      longitude: record.longitude,
    });
  };

  const createMutation = useCreateGreenPlace();
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

  const updateMutation = useUpdateGreenPlace();
  const onUpdate = (id: TGreenPlaceResponse['id']) => {
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

  const deleteMutation = useDeleteGreenPlace();
  const onDelete = (id: TGreenPlaceResponse['id']) => {
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
