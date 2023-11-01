import NavBar from '@/components/navigations/Navbar';
import SideBar, { getItem } from '@/components/navigations/Sider';
import {
  PieChartOutlined,
  GlobalOutlined,
  UsergroupAddOutlined,
  KeyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Space, Typography } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';

const menus: MenuItemType[] = [
  getItem('Dashboard', '/backoffice/dashboard', <PieChartOutlined />),
  getItem('Region', '/backoffice/regions', <GlobalOutlined />, [
    getItem('Provinces', '/backoffice/regions/provinces'),
    getItem('Cities', '/backoffice/regions/cities'),
    getItem('Districts', '/backoffice/regions/districts'),
  ]),
  getItem('Green Places', '/backoffice/green-places', <PieChartOutlined />),
  getItem('Complaints', '/backoffice/complaints', <PieChartOutlined />),
  getItem('Communities', '/backoffice/communities', <PieChartOutlined />),
  getItem(
    'Community Users',
    '/backoffice/community-users',
    <PieChartOutlined />,
  ),
  getItem('Basecamps', '/backoffice/basecamps', <PieChartOutlined />),
  getItem('Events', '/backoffice/events', <PieChartOutlined />),
  getItem('Tickets', '/backoffice/tickets', <PieChartOutlined />),
  getItem(
    'Ticket Transactions',
    '/backoffice/ticket-transactions',
    <PieChartOutlined />,
  ),
  getItem('Donations', '/backoffice/donations', <PieChartOutlined />),
  getItem(
    'Donation Transactions',
    '/backoffice/donation-transactions',
    <PieChartOutlined />,
  ),
  getItem('Comments', '/backoffice/comments', <PieChartOutlined />),
  getItem(
    'User Settings',
    '/backoffice/user-settings',
    <UsergroupAddOutlined />,
    [
      getItem('Roles', '/backoffice/user-settings/roles', <KeyOutlined />),
      getItem('Users', '/backoffice/user-settings/users', <UserOutlined />),
    ],
  ),
];

type BackofficeLayoutType = {
  children: React.ReactNode;
  title: string;
  breadcrumbs?: {
    title: string;
    href?: string;
  }[];
  extra?: React.ReactNode;
};

export default function BackofficeLayout(props: BackofficeLayoutType) {
  const { children, title, breadcrumbs, extra } = props;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar menus={menus} />

      <Layout>
        <NavBar />
        <Layout.Content style={{ padding: '3rem 5rem' }}>
          <Breadcrumb
            items={breadcrumbs?.map((item) => {
              if (item.href) {
                return { title: <Link href={item.href}>{item.title}</Link> };
              }

              return {
                title: item.title,
              };
            })}
          />
          <Space
            style={{
              width: '100%',
              justifyContent: 'space-between',
              margin: '.25rem 0 .5rem 0',
            }}
            align="center"
          >
            <Typography.Title style={{ margin: 0 }}>{title}</Typography.Title>
            <div>{extra}</div>
          </Space>

          <Layout.Content style={{ padding: '2rem 0' }}>
            {children}
          </Layout.Content>
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          GreenSpace Connect ©2023 Created by CPI-FS-SDG-11-B
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
