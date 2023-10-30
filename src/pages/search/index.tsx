import EventSection from '@/components/sections/EventSection';
import FilterSection from '@/components/sections/FilterSection';
import GreenSpaceSection from '@/components/sections/GreenSpaceSection';
import ListingLayout from '@/layouts/ListingLayout';
import { Space, Tabs, TabsProps, Tag } from 'antd';

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
      <Space size={[0, 16]} wrap style={{ marginBottom: '1rem' }}>
        <Tag>3 Hari</Tag>
        <Tag>1 Minggu</Tag>
        <Tag>1 Bulan</Tag>
      </Space>

      <Tabs defaultActiveKey="events" items={tabs} />
    </ListingLayout>
  );
}
