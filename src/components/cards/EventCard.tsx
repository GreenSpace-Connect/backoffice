import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { Avatar, Card, Space, Typography } from 'antd';
import dayjs from 'dayjs';

type EventCardProps = {
  thumbnail?: TEventResponse['thumbnail'];
  name?: TEventResponse['name'];
  schedule?: TEventResponse['schedule'];
  communityName?: TEventResponse['community']['name'];
  loading?: boolean;
};

export default function EventCard(props: EventCardProps) {
  const { name, communityName, schedule, thumbnail, loading } = props;

  return (
    <Card
      loading={loading}
      className="event-card"
      cover={
        <img
          src={thumbnail}
          style={{ height: '100px', backgroundSize: 'cover' }}
        />
      }
      actions={[
        <Space key={1}>
          <Avatar />
          <Typography.Text style={{ fontSize: '10px' }}>
            {communityName}
          </Typography.Text>
        </Space>,
      ]}
      hoverable
    >
      <Space direction="vertical">
        <Typography.Text strong style={{ cursor: 'pointer' }}>
          {name}
        </Typography.Text>
        <Typography.Text type="secondary">
          {dayjs(schedule).format('DD MMM YYYY')}
        </Typography.Text>
      </Space>
    </Card>
  );
}
