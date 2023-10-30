import { Col, ColProps } from 'antd';

export default function ListColum(props: ColProps) {
  const { children, ...args } = props;

  return (
    <Col xs={12} lg={8} xl={6} {...args}>
      {children}
    </Col>
  );
}
