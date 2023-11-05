import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';

const { confirm: confirmAnt } = Modal;

export const confirmDelete = (props: ModalFuncProps) => {
  confirmAnt({
    title: 'Are you sure delete this item?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    ...props,
  });
};

export const confirm = (props: ModalFuncProps) => {
  {
    confirmAnt({
      okText: 'Yes',
      cancelText: 'No',
      ...props,
    });
  }
};
