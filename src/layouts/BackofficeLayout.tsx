import NavBar from '@/components/navigations/Navbar';
import SideBar from '@/components/navigations/Sider';
import { Breadcrumb, Layout, Space, Typography } from 'antd';
import Link from 'next/link';

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
      <SideBar />

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
