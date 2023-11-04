import EventSection from '@/components/sections/EventSection';
import GreenSpaceSection from '@/components/sections/GreenSpaceSection';
import ListingLayout from '@/layouts/ListingLayout';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import { Carousel, Image } from 'antd';

export default function Home() {
  const eventDataHook = useGetEvents({
    params: {
      perPage: 4,
    },
  });

  return (
    <>
      <ListingLayout>
        {eventDataHook.data?.items.length ? (
          <Carousel style={{ marginBottom: '2rem' }}>
            {eventDataHook.data?.items.map((item) => (
              <div key={item.id}>
                <Image
                  src={item.thumbnail}
                  style={{
                    height: '300px',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '1rem',
                  }}
                  width="100%"
                />
              </div>
            ))}
          </Carousel>
        ) : null}

        <div style={{ marginBottom: '2rem' }}>
          <EventSection seeMore />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <GreenSpaceSection seeMore />
        </div>
      </ListingLayout>
    </>
  );
}
