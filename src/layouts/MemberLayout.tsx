import NavBar from '@/components/navigations/Navbar';
import SideBar, { getItem } from '@/components/navigations/Sider';
import {
  CreditCardOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Space, Typography } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import Link from 'next/link';

const menus: MenuItemType[] = [
  getItem('My Communities', '/member', <PieChartOutlined />),
  getItem('My Transactions', '/member/my-transactions', <CreditCardOutlined />),
  getItem('My Profile', '/member/my-profile', <UserOutlined />),
];

type MemberLayoutType = {
  children: React.ReactNode;
  title?: React.ReactNode;
  breadcrumbs?: {
    title: string;
    href?: string;
  }[];
  extra?: React.ReactNode;
};

export default function MemberLayout(props: MemberLayoutType) {
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
            {title && (
              <div>
                <Typography.Title style={{ margin: 0 }}>
                  {title}
                </Typography.Title>
              </div>
            )}

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
