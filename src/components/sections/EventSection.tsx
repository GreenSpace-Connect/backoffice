import { Empty, Pagination, Row } from 'antd';
import EventCard from '../cards/EventCard';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import ListColum from '../layouts/ListColumn';
import { useAppSelector } from '@/services/redux/store';
import { usePagination } from '@/utils/hooks/useFilter';

export default function EventSection() {
  const pagination = usePagination();
  const filter = useAppSelector((state) => state.searchFilter);

  const eventDataHook = useGetEvents({
    params: filter,
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
      <Row gutter={16}>
        {eventDataHook.data?.items.map((event) => (
          <ListColum key={event.id}>
            <EventCard
              name={event.name}
              schedule={event.schedule}
              thumbnail={event.thumbnail}
              communityName={event.community.name}
            />
          </ListColum>
        ))}
      </Row>

      <Pagination
        style={{ marginTop: '2rem' }}
        current={eventDataHook.data?.meta.currentPage}
        onChange={(page) =>
          pagination.onChange({
            current: page,
          })
        }
      />
    </>
  );
}
