import { TGreenPlaceResponse } from '@/modules/master-data/green-places/entities/response';
import { Card, Space, Typography } from 'antd';

type GreenSpaceCardProps = {
  name?: TGreenPlaceResponse['name'];
  address?: TGreenPlaceResponse['address'];
  loading?: boolean;
};

export default function GreenSpaceCard(props: GreenSpaceCardProps) {
  const { name, address, loading } = props;

  return (
    <Card loading={loading} className="greenspace-card" hoverable>
      <Space direction="vertical">
        <Typography.Text strong style={{ cursor: 'pointer', fontSize: '1rem' }}>
          {name}
        </Typography.Text>
        <Typography.Text type="secondary">{address}</Typography.Text>
      </Space>
    </Card>
  );
}
