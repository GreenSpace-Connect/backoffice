import AsyncModal from '@/components/modals/AsyncModal';
import MemberEventDonationSection from '@/components/sections/MemberEventDonationSection';
import MemberEventTicketSection from '@/components/sections/MemberEventTicketSection';
import MemberLayout from '@/layouts/MemberLayout';
import EventForm from '@/modules/master-data/events/components/EventForm';
import { useEventForm } from '@/modules/master-data/events/hooks/useForm';
import { useGetEventDetails } from '@/modules/master-data/events/hooks/useQuery';
import { EditOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Spin, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function EventDetailsPage() {
  const router = useRouter();
  const eventId = Number(router.query.eventId);

  const eventDetailsHook = useGetEventDetails({
    id: eventId,
    options: {
      onSuccess: (data) => {
        setFields(data.data);
      },
    },
  });

  const { form, setFields, updateMutation, onUpdate } =
    useEventForm(eventDetailsHook);

  return (
    <MemberLayout
      title={
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {eventDetailsHook.isFetching ? (
            <Spin />
          ) : (
            <>
              {eventDetailsHook.data?.data.name}
              {eventDetailsHook.data?.data ? (
                <AsyncModal
                  title="Update"
                  button={
                    <Button type="link" size="large" icon={<EditOutlined />} />
                  }
                  mutation={updateMutation}
                  onSubmit={form.submit}
                >
                  <EventForm
                    form={form}
                    communityId={eventDetailsHook.data.data.community.id}
                    onFinish={() => onUpdate(eventDetailsHook.data?.data.id)}
                  />
                </AsyncModal>
              ) : null}
              <Typography.Text>
                <Link href={`/event/${eventDetailsHook.data?.data.id}`}>
                  <LinkOutlined />
                </Link>
              </Typography.Text>
            </>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <MemberEventTicketSection eventId={eventDetailsHook.data?.data.id} />

        <MemberEventDonationSection eventId={eventDetailsHook.data?.data.id} />
      </div>
    </MemberLayout>
  );
}
