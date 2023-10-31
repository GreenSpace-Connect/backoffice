import { Layout, Menu, Typography } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

type SideBarProps = {
  menus: MenuItemType[];
};

export default function SideBar(props: SideBarProps) {
  const { menus } = props;

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
      <Layout.Sider collapsedWidth={0} breakpoint="sm" width={250}>
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

export function getItem(
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
