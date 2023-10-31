import { Space, Typography } from 'antd';

type TitleNavigationProps = {
  title: string;
  extra?: React.ReactNode;
};

export default function TitleNavigation(props: TitleNavigationProps) {
  const { title, extra } = props;

  return (
    <Space
      style={{
        width: '100%',
        justifyContent: 'space-between',
        margin: '.25rem 0 .5rem 0',
      }}
      align="center"
    >
      <Typography.Title style={{ margin: 0 }} level={3}>
        {title}
      </Typography.Title>

      <div>{extra}</div>
    </Space>
  );
}
