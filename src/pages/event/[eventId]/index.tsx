import ListingLayout from '@/layouts/ListingLayout';
import { useGetEventDetails } from '@/modules/master-data/events/hooks/useQuery';
import {
  Avatar,
  Breadcrumb,
  Card,
  Col,
  Image,
  Row,
  Space,
  Spin,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function EventDetailsPage() {
  const router = useRouter();
  const eventId = Number(router.query.eventId);

  const eventDetailsHooks = useGetEventDetails({
    id: eventId,
  });

  const tabs: TabsProps['items'] = [
    {
      key: 'description',
      label: 'Description',
      children: (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: eventDetailsHooks.data?.data.description || '',
            }}
          />
        </>
      ),
    },
    {
      key: 'tickets',
      label: 'Tickets',
      children: (
        <>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam,
          optio?
        </>
      ),
    },
  ];

  return (
    <ListingLayout>
      {eventDetailsHooks.isFetching ? (
        <Spin />
      ) : (
        <>
          <Breadcrumb
            items={[
              { title: <Link href="/search">Search</Link> },
              { title: eventDetailsHooks.data?.data.name },
            ]}
            style={{ marginBottom: '1rem' }}
          />

          <Row gutter={[48, 16]}>
            <Col xs={24} lg={16}>
              <Image
                src={eventDetailsHooks.data?.data.thumbnail}
                width="100%"
              />
              <Typography.Title level={2}>
                {eventDetailsHooks.data?.data.name}
              </Typography.Title>

              <Tabs defaultActiveKey="description" items={tabs} />
            </Col>

            <Col xs={24} lg={8}>
              <Card
                actions={[
                  <Space key={1}>
                    <Avatar
                      src={eventDetailsHooks.data?.data.community.photo}
                    />
                    <Typography.Text style={{ fontSize: '10px' }}>
                      {eventDetailsHooks.data?.data.community.name}
                    </Typography.Text>
                  </Space>,
                ]}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                sunt soluta nihil quia! Repellendus cum veritatis provident
                animi quis voluptatem, quaerat ratione sed asperiores,
                reiciendis laudantium. Voluptatem sequi aliquid aliquam eos!
                Suscipit illo nam vel ratione eius doloribus mollitia corrupti
                quos maiores pariatur in dolores quidem ad sunt nisi hic sit
                earum ipsum optio, culpa, numquam et corporis molestiae. Aliquid
                fugit eligendi voluptas labore commodi iste deleniti doloribus
                consequatur nisi incidunt obcaecati, excepturi vero temporibus
                esse id recusandae, aliquam dolorum magnam expedita culpa.
                Cumque, cupiditate dolorem repellat consequuntur a sunt
                molestiae eaque tempore deserunt soluta hic harum doloremque
                consequatur aperiam.
              </Card>
            </Col>
          </Row>
        </>
      )}
    </ListingLayout>
  );
}
