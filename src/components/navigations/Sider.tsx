import {
  GlobalOutlined,
  KeyOutlined,
  PieChartOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const getOpenMenus = () => {
    const found = menus
      .filter((item) => pathname?.includes(String(item.key)))
      .pop();

    return [String(found?.key)];
  };

  return (
    <>
      <Layout.Sider collapsedWidth={0} breakpoint="sm">
        <div style={{ padding: '0 .5rem' }}>
          <Typography.Title
            level={4}
            style={{
              color: '#ffffff',
              height: '64px',
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '.5rem',
            }}
          >
            GS Connect
          </Typography.Title>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[pathname ?? '']}
            defaultOpenKeys={getOpenMenus()}
            items={menus}
            onClick={(item) => {
              router.push(item.key);
            }}
          />
        </div>
      </Layout.Sider>
    </>
  );
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[],
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemType;
}

const menus: MenuItemType[] = [
  getItem('Dashboard', '/backoffice/dashboard', <PieChartOutlined />),
  getItem('Region', '/backoffice/regions', <GlobalOutlined />, [
    getItem('Province', '/backoffice/regions/provinces'),
    getItem('City', '/backoffice/regions/cities'),
    getItem('District', '/backoffice/regions/districts'),
  ]),
  getItem('Green Place', '/backoffice/green-places', <PieChartOutlined />),
  getItem(
    'User Setting',
    '/backoffice/user-settings',
    <UsergroupAddOutlined />,
    [
      getItem('Role', '/backoffice/user-settings/roles', <KeyOutlined />),
      getItem('User', '/backoffice/user-settings/users', <UserOutlined />),
    ],
  ),
];
