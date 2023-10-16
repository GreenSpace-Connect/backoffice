import { TResponseError } from '@/utils/entities/response';
import { FormInstance } from 'antd';

export const setErrorForm = <Payload, Response>(
  form: FormInstance<Payload>,
  message: TResponseError<Response>['message'],
) => {
  form.setFields(
    message.map((item) => {
      return {
        name: item.field as string,
        errors: item.messages,
      };
    }),
  );
};
