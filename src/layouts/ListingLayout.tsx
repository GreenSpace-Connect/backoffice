import React from 'react';
import { Layout, theme } from 'antd';
import FrontNavbar from '@/components/navigations/FrontNavbar';

type ListingLayoutProps = {
  children: React.ReactNode;
  sider?: React.ReactNode;
};

export default function ListingLayout(props: ListingLayoutProps) {
  const { children, sider } = props;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <FrontNavbar />

      <Layout className="container">
        {sider && (
          <Layout.Sider
            width={250}
            style={{
              backgroundColor: colorBgContainer,
              borderRadius: '1rem',
              padding: '2rem',
            }}
          >
            {sider}
          </Layout.Sider>
        )}

        <Layout style={{ padding: '0 2rem 2rem' }}>
          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Layout.Content>
        </Layout>
      </Layout>

      <Layout.Footer style={{ textAlign: 'center' }}>
        GreenSpace Connect ©2023 Created by CPI-FS-SDG-11-B
      </Layout.Footer>
    </Layout>
  );
}
