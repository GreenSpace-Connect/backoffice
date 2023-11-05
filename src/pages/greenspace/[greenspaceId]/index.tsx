import EventCard from '@/components/cards/EventCard';
import Map from '@/components/cards/Map';
import ListColum from '@/components/layouts/ListColumn';
import ListingLayout from '@/layouts/ListingLayout';
import { TEventParams } from '@/modules/master-data/events/entities/request';
import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import { useGetGreenPlaceDetails } from '@/modules/master-data/green-places/hooks/useQuery';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Row, Space, Spin, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GreenSpaceDetailsPage() {
  const router = useRouter();
  const greenspaceId = Number(router.query.greenspaceId);

  const greenSpaceDetailHook = useGetGreenPlaceDetails({
    id: greenspaceId,
  });
  const placeName = greenSpaceDetailHook.data?.data.name;

  const filterHook = useTableFilter<TEventParams, TEventResponse>();
  const eventDataHook = useGetEvents({
    params: {
      ...filterHook.params,
      placeName,
    },
    options: {
      enabled: !!placeName,
    },
  });

  return (
    <ListingLayout>
      {greenSpaceDetailHook.isFetching ? (
        <Spin />
      ) : (
        <>
          <Breadcrumb
            items={[
              { title: <Link href="/search">Search</Link> },
              { title: greenSpaceDetailHook.data?.data.name },
            ]}
            style={{ marginBottom: '1rem' }}
          />

          <Row gutter={[48, 16]}>
            <Col xs={24} lg={16}>
              {greenSpaceDetailHook.data?.data ? (
                <Map
                  defaultSelectedPlace={greenSpaceDetailHook.data.data.name}
                  defaultCurrentLocation={{
                    lat: Number(greenSpaceDetailHook.data.data.latitude),
                    lng: Number(greenSpaceDetailHook.data.data.longitude),
                  }}
                  hideSearch
                  mapContainerStyle={{
                    height: '500px',
                  }}
                />
              ) : null}

              <Typography.Title level={2}>
                {greenSpaceDetailHook.data?.data.name}
              </Typography.Title>

              <div
                dangerouslySetInnerHTML={{
                  __html: greenSpaceDetailHook.data?.data.description || '',
                }}
              />
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Details">
                <div
                  style={{
                    display: 'grid',
                    gap: '.5rem',
                  }}
                >
                  <Space align="start">
                    <GlobalOutlined />
                    <Typography.Text>
                      {greenSpaceDetailHook.data?.data.province.name}
                    </Typography.Text>
                  </Space>
                  <Space align="start">
                    <GlobalOutlined />
                    <Typography.Text>
                      {greenSpaceDetailHook.data?.data.city.name}
                    </Typography.Text>
                  </Space>
                  <Space align="start">
                    <GlobalOutlined />
                    <Typography.Text>
                      {greenSpaceDetailHook.data?.data.district.name}
                    </Typography.Text>
                  </Space>
                  <Space align="start">
                    <EnvironmentOutlined />
                    <Typography.Text>
                      {greenSpaceDetailHook.data?.data.address}
                    </Typography.Text>
                  </Space>
                </div>
              </Card>
            </Col>

            <Col xs={24}>
              <Typography.Title level={3}>Events</Typography.Title>
              <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
                {eventDataHook.data?.items.map((event) => (
                  <ListColum key={event.id}>
                    <Link href={`/event/${event.id}`}>
                      <EventCard
                        name={event.name}
                        schedule={event.schedule}
                        thumbnail={event.thumbnail}
                        community={event.community}
                        style={{ height: '100%' }}
                      />
                    </Link>
                  </ListColum>
                ))}
              </Row>
            </Col>
          </Row>
        </>
      )}
    </ListingLayout>
  );
}
