import AsyncModal from '@/components/modals/AsyncModal';
import ListingLayout from '@/layouts/ListingLayout';
import DonationTransactionForm from '@/modules/master-data/donation-transactions/components/DonationTransactionForm';
import { useDonationTransactionForm } from '@/modules/master-data/donation-transactions/hooks/useForm';
import { useGetDonations } from '@/modules/master-data/donations/hooks/useQuery';
import { useGetEventDetails } from '@/modules/master-data/events/hooks/useQuery';
import TicketTransactionForm from '@/modules/master-data/ticket-transactions/components/TicketTransactionForm';
import { useTicketTransactionForm } from '@/modules/master-data/ticket-transactions/hooks/useForm';
import { useGetTickets } from '@/modules/master-data/tickets/hooks/useQuery';
import { confirm } from '@/services/antd/confirm';
import { convertToIdr, formatDate } from '@/utils/helpers/string.helper';
import { EnvironmentOutlined, ScheduleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Empty,
  Image,
  Row,
  Slider,
  Space,
  Spin,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Map from '@/components/cards/Map';

export default function EventDetailsPage() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const router = useRouter();
  const eventId = Number(router.query.eventId);

  const eventDetailsHook = useGetEventDetails({
    id: eventId,
  });

  const donationDataHooks = useGetDonations({
    params: {
      eventId,
    },
    options: {
      enabled: !!eventId,
    },
  });
  const donationTransactionForm = useDonationTransactionForm(donationDataHooks);

  const ticketDataHook = useGetTickets({
    params: {
      eventId,
    },
    options: {
      enabled: !!eventId,
    },
  });
  const ticketTransactionForm = useTicketTransactionForm(ticketDataHook);

  const tabs: TabsProps['items'] = [
    {
      key: 'description',
      label: 'Description',
      children: (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: eventDetailsHook.data?.data.description || '',
            }}
          />
        </>
      ),
    },
    {
      key: 'tickets',
      label: 'Tickets',
      children: (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {!ticketDataHook.data?.items.length ? <Empty /> : null}
          {ticketDataHook.data?.items.map((ticket) => (
            <Card key={ticket.id} title={ticket.name}>
              <Typography.Title level={3} style={{ marginTop: 0 }}>
                {convertToIdr(ticket.price)}
              </Typography.Title>
              {userId ? (
                <TicketTransactionForm
                  form={ticketTransactionForm.form}
                  ticketId={ticket.id}
                  userId={userId}
                />
              ) : null}
              <Button
                type="primary"
                onClick={() => {
                  confirm({
                    title: 'Are you sure want to buy?',
                    onCancel: () => {
                      ticketTransactionForm.form.resetFields();
                    },
                    onOk: () => {
                      ticketTransactionForm.form.setFieldsValue({
                        ticketId: ticket.id,
                        userId: userId,
                      });
                      ticketTransactionForm.onCreate();
                    },
                  });
                }}
                disabled={!userId}
              >
                Buy Ticket
              </Button>
            </Card>
          ))}
        </div>
      ),
    },
  ];

  return (
    <ListingLayout>
      {eventDetailsHook.isFetching ? (
        <Spin />
      ) : (
        <>
          <Breadcrumb
            items={[
              { title: <Link href="/search">Search</Link> },
              { title: eventDetailsHook.data?.data.name },
            ]}
            style={{ marginBottom: '1rem' }}
          />

          <Row gutter={[48, 16]}>
            <Col xs={24} lg={16}>
              <Image
                src={eventDetailsHook.data?.data.thumbnail}
                width="100%"
                style={{ borderRadius: '1rem' }}
              />
              <Typography.Title level={2}>
                {eventDetailsHook.data?.data.name}
              </Typography.Title>

              <Tabs defaultActiveKey="description" items={tabs} />
            </Col>

            <Col xs={24} lg={8}>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {eventDetailsHook.data?.data ? (
                  <Map
                    defaultSelectedPlace={eventDetailsHook.data.data.placeName}
                    defaultCurrentLocation={{
                      lat: Number(eventDetailsHook.data.data.latitude),
                      lng: Number(eventDetailsHook.data.data.longitude),
                    }}
                    hideSearch
                  />
                ) : null}

                <Card
                  title="Details"
                  actions={[
                    <Space key={1}>
                      <Avatar
                        src={eventDetailsHook.data?.data.community.photo}
                      />
                      <Typography.Text style={{ fontSize: '10px' }}>
                        {eventDetailsHook.data?.data.community.name}
                      </Typography.Text>
                    </Space>,
                  ]}
                >
                  <div
                    style={{
                      display: 'grid',
                      gap: '.5rem',
                    }}
                  >
                    <Space align="start">
                      <ScheduleOutlined />
                      <Typography.Text>
                        {formatDate(eventDetailsHook.data?.data.schedule)}
                      </Typography.Text>
                    </Space>
                    <Space align="start">
                      <EnvironmentOutlined />
                      <Typography.Text>
                        {eventDetailsHook.data?.data.address}
                      </Typography.Text>
                    </Space>
                  </div>
                </Card>

                {donationDataHooks.data?.items.map((donation) => (
                  <Card key={donation.id} title={donation.name}>
                    <div
                      style={{
                        display: 'grid',
                        gap: '.5rem',
                      }}
                    >
                      <Typography.Paragraph>
                        {donation.description}
                      </Typography.Paragraph>
                      <Typography.Text>
                        {`${formatDate(donation.startDate)} - ${formatDate(
                          donation.endDate,
                        )}`}
                      </Typography.Text>
                      <Slider
                        defaultValue={0}
                        marks={{
                          0: 'Rp 0',
                          [donation.expectDonation]: `${convertToIdr(
                            donation.expectDonation,
                          )}`,
                        }}
                        max={donation.expectDonation}
                        value={donation.donationTransaction.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.amount,
                          0,
                        )}
                        tooltip={{
                          formatter: (value) =>
                            convertToIdr(value ? +value : 0),
                        }}
                      />
                      <AsyncModal
                        title="Donate"
                        button={
                          <Button
                            type="primary"
                            onClick={() => {
                              donationTransactionForm.form.resetFields();
                              donationTransactionForm.form.setFieldsValue({
                                donationId: donation.id,
                                userId: userId,
                              });
                            }}
                            block
                            disabled={!userId}
                          >
                            Donate
                          </Button>
                        }
                        mutation={donationTransactionForm.createMutation}
                        onSubmit={donationTransactionForm.form.submit}
                      >
                        <DonationTransactionForm
                          form={donationTransactionForm.form}
                          donationId={donation.id}
                          userId={userId}
                          onFinish={donationTransactionForm.onCreate}
                        />
                      </AsyncModal>
                    </div>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </>
      )}
    </ListingLayout>
  );
}
