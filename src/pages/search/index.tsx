import EventSection from '@/components/sections/EventSection';
import FilterSection from '@/components/sections/FilterSection';
import GreenSpaceSection from '@/components/sections/GreenSpaceSection';
import ListingLayout from '@/layouts/ListingLayout';
import { changeSearchFilter } from '@/services/redux/reducers/searchFilterReducer';
import store from '@/services/redux/store';
import { Tabs, TabsProps } from 'antd';

export default function GreenSpaceIndex() {
  const tabs: TabsProps['items'] = [
    {
      key: 'events',
      label: 'Events',
      children: <EventSection />,
    },
    {
      key: 'greenspace',
      label: 'GreenSpace',
      children: <GreenSpaceSection />,
    },
  ];

  return (
    <ListingLayout sider={<FilterSection />}>
      <Tabs
        defaultActiveKey="events"
        items={tabs}
        onChange={() => {
          store.dispatch(
            changeSearchFilter({
              page: 1,
            }),
          );
        }}
      />
    </ListingLayout>
  );
}
