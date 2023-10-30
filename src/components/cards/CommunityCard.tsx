import { TCommunityResponse } from '@/modules/master-data/communities/entities/response';
import { Card, Space, Typography } from 'antd';

type CommunityCardProps = {
  name?: TCommunityResponse['name'];
  loading?: boolean;
};

export default function CommunityCard(props: CommunityCardProps) {
  const { name, loading } = props;

  return (
    <Card loading={loading} className="greenspace-card" hoverable>
      <Space direction="vertical">
        <Typography.Text strong style={{ cursor: 'pointer', fontSize: '1rem' }}>
          {name}
        </Typography.Text>
      </Space>
    </Card>
  );
}
