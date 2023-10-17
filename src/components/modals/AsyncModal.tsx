import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';

type AsyncModalProps<TRS, TRE, TP> = {
  button: React.ReactNode;
  title: string;
  onSubmit: () => void;
  children: React.ReactNode;
  mutation: UseMutationResult<TRS, TRE, TP>;
};

export default function AsyncModal<TRS, TRE, TP>(
  props: AsyncModalProps<TRS, TRE, TP>,
) {
  const { title, button, children, mutation, onSubmit } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    onSubmit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      handleCancel();
    }
  }, [mutation.isSuccess]);

  return (
    <>
      <div onClick={() => setIsModalOpen(!isModalOpen)}>{button}</div>

      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={mutation.isLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  );
}
