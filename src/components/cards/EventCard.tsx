import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { Avatar, Card, CardProps, Space, Typography } from 'antd';
import dayjs from 'dayjs';

type EventCardProps = CardProps & {
  thumbnail?: TEventResponse['thumbnail'];
  name?: TEventResponse['name'];
  schedule?: TEventResponse['schedule'];
  community?: TEventResponse['community'];
  loading?: boolean;
};

export default function EventCard(props: EventCardProps) {
  const { name, community, schedule, thumbnail, loading, ...args } = props;

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
          <Avatar src={community?.photo} />
          <Typography.Text style={{ fontSize: '10px' }}>
            {community?.name}
          </Typography.Text>
        </Space>,
      ]}
      hoverable
      {...args}
    >
      <Typography.Paragraph
        strong
        style={{ cursor: 'pointer' }}
        title={name}
        ellipsis={{ rows: 2 }}
      >
        {name}
      </Typography.Paragraph>
      <Typography.Text type="secondary">
        {dayjs(schedule).format('DD MMM YYYY')}
      </Typography.Text>
    </Card>
  );
}
