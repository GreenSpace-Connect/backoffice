import EventCard from '@/components/cards/EventCard';
import Map from '@/components/cards/Map';
import ListColum from '@/components/layouts/ListColumn';
import AsyncModal from '@/components/modals/AsyncModal';
import ListingLayout from '@/layouts/ListingLayout';
import ComplaintForm from '@/modules/master-data/complaints/components/ComplaintForm';
import { TComplaintParams } from '@/modules/master-data/complaints/entities/request';
import { TComplaintResponse } from '@/modules/master-data/complaints/entities/response';
import { useComplaintForm } from '@/modules/master-data/complaints/hooks/useForm';
import { useGetComplaints } from '@/modules/master-data/complaints/hooks/useQuery';
import { TEventParams } from '@/modules/master-data/events/entities/request';
import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import { useGetGreenPlaceDetails } from '@/modules/master-data/green-places/hooks/useQuery';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { EnvironmentOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Space,
  Spin,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GreenSpaceDetailsPage() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const router = useRouter();
  const greenspaceId = Number(router.query.greenspaceId);

  const greenSpaceDetailHook = useGetGreenPlaceDetails({
    id: greenspaceId,
  });
  const placeName = greenSpaceDetailHook.data?.data.name;

  const eventsFilterHook = useTableFilter<TEventParams, TEventResponse>();
  const eventDataHook = useGetEvents({
    params: {
      ...eventsFilterHook.params,
      placeName,
    },
    options: {
      enabled: !!placeName,
    },
  });

  const complaintsFilterHook = useTableFilter<
    TComplaintParams,
    TComplaintResponse
  >();
  const complaintDataHook = useGetComplaints({
    params: {
      ...complaintsFilterHook.params,
      greenPlaceId: greenspaceId,
    },
    options: {
      enabled: !!greenspaceId,
    },
  });
  const complaintForm = useComplaintForm(complaintDataHook);

  const tabs: TabsProps['items'] = [
    {
      key: 'description',
      label: 'Description',
      children: (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: greenSpaceDetailHook.data?.data.description || '',
            }}
          />
        </>
      ),
    },
    {
      key: 'complaints',
      label: 'Complaints',
      children: (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {!complaintDataHook.data?.items.length ? <Empty /> : null}
          {complaintDataHook.data?.items.map((complaint) => (
            <Card key={complaint.id} title={complaint.subject}>
              <Typography.Paragraph>
                {complaint.description}
              </Typography.Paragraph>
            </Card>
          ))}
        </div>
      ),
    },
  ];

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

              <Tabs defaultActiveKey="description" items={tabs} />
            </Col>

            <Col xs={24} lg={8}>
              <div style={{ display: 'grid', gap: '1rem' }}>
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

                <Card title="Facilities Complaint">
                  <AsyncModal
                    title="Update"
                    button={
                      <Button
                        type="primary"
                        block
                        disabled={!userId}
                        onClick={() => {
                          complaintForm.form.resetFields();
                          complaintForm.form.setFieldsValue({
                            userId,
                            greenPlaceId: greenspaceId,
                          });
                        }}
                      >
                        Complaint
                      </Button>
                    }
                    mutation={complaintForm.createMutation}
                    onSubmit={complaintForm.form.submit}
                  >
                    <ComplaintForm
                      form={complaintForm.form}
                      greenPlaceId={greenspaceId}
                      userId={userId}
                      onFinish={complaintForm.onCreate}
                    />
                  </AsyncModal>
                </Card>
              </div>
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
