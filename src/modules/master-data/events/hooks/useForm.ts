import { TExpectQueryResult } from '@/utils/entities/hook';
import { TEventResponse } from '../entities/response';
import { Form } from 'antd';
import { TEventPayload } from '../entities/request';
import { useCreateEvent, useDeleteEvent, useUpdateEvent } from './useQuery';
import { setErrorForm } from '@/services/antd/form';
import { successMessage, failedMessage } from '@/services/antd/message';
import dayjs from 'dayjs';

export const useEventForm = <Response>(
  dataHook?: TExpectQueryResult<Response>,
) => {
  const [form] = Form.useForm<TEventPayload>();

  const setFields = (record: TEventResponse) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      communityId: record.community.id,
      thumbnail: record.thumbnail,
      schedule: dayjs(record.schedule),
      placeName: record.placeName,
      provinceId: record.province.id,
      cityId: record.city.id,
      districtId: record.district.id,
      address: record.address,
      latitude: record.latitude,
      longitude: record.longitude,
    });
  };

  const createMutation = useCreateEvent();
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

  const updateMutation = useUpdateEvent();
  const onUpdate = (id: TEventResponse['id']) => {
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

  const deleteMutation = useDeleteEvent();
  const onDelete = (id: TEventResponse['id']) => {
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
