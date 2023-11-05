import { Empty, Pagination, Row, Typography } from 'antd';
import EventCard from '../cards/EventCard';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import ListColum from '../layouts/ListColumn';
import store, { useAppSelector } from '@/services/redux/store';
import { changeSearchFilter } from '@/services/redux/reducers/searchFilterReducer';
import Link from 'next/link';

type EventSectionProps = {
  seeMore?: boolean;
};

export default function EventSection(props: EventSectionProps) {
  const { seeMore = false } = props;

  const filter = useAppSelector((state) => state.searchFilter);

  const eventDataHook = useGetEvents({
    params: { ...filter, perPage: seeMore ? 4 : 8 },
  });

  if (eventDataHook.isFetching) {
    return (
      <Row gutter={16}>
        {[1, 2, 3].map((item) => (
          <ListColum key={item}>
            <EventCard loading={true} />
          </ListColum>
        ))}
      </Row>
    );
  }

  if (eventDataHook.data?.items.length === 0) {
    return <Empty />;
  }

  return (
    <>
      {seeMore ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '1rem',
          }}
        >
          <Typography.Title level={2}>Events</Typography.Title>
          <Link href="search">
            <Typography.Text>See more</Typography.Text>
          </Link>
        </div>
      ) : null}

      <Row gutter={[16, 16]}>
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

      {!seeMore ? (
        <Pagination
          style={{ marginTop: '2rem' }}
          current={eventDataHook.data?.meta.currentPage}
          pageSize={eventDataHook.data?.meta.perPage}
          total={eventDataHook.data?.meta.total}
          onChange={(page) => {
            store.dispatch(
              changeSearchFilter({
                ...filter,
                page,
              }),
            );
          }}
        />
      ) : null}
    </>
  );
}
