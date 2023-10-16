import { MessageArgsProps, message } from 'antd';
import { CSSProperties } from 'react';

const globalStyle: CSSProperties = {
  marginTop: '.5rem',
};

export const successMessage = (options?: MessageArgsProps) => {
  message.open({
    type: 'success',
    style: {
      ...globalStyle,
    },
    content: 'Successfully do action!',
    ...options,
  });
};

export const failedMessage = (options?: MessageArgsProps) => {
  message.open({
    type: 'error',
    style: {
      ...globalStyle,
    },
    content: 'Failed do action!',
    ...options,
  });
};
