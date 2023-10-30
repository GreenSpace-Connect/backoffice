import { chnageCommunityActived } from '@/services/redux/reducers/userReducer';
import store from '@/services/redux/store';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Avatar, DropdownProps } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthDropdown() {
  const session = useSession();
  const router = useRouter();

  const menu: DropdownProps['menu'] = {
    items: [
      {
        key: 'signOut',
        label: 'Sign Out',
        icon: <LogoutOutlined />,
        style: {
          width: 150,
        },
        onClick: () => signOut(),
      },
    ],
  };

  if (session.data?.user?.community.length) {
    menu.items?.push({
      key: 'my-community',
      label: 'My Community',
      icon: <SettingOutlined />,
      style: {
        width: 150,
      },
      children: session.data?.user?.community.map((item) => ({
        key: item.id,
        label: item.name,
        onClick: () => {
          store.dispatch(chnageCommunityActived(item.id));
          router.push(`/my-community/${item.id}`);
        },
      })),
    });
  }

  if (session.data?.user?.role.name === 'admin') {
    menu.items?.push({
      key: 'backoffice',
      label: 'Go to Backoffice',
      icon: <SettingOutlined />,
      style: {
        width: 150,
      },
      onClick: () => router.push('/backoffice'),
    });
  }

  useEffect(() => {
    if (session.data?.user?.community.length) {
      store.dispatch(
        chnageCommunityActived(session.data?.user?.community[0].id),
      );
    }
  }, []);

  return (
    <Dropdown
      trigger={['click']}
      menu={{
        ...menu,
        items: menu.items?.reverse(),
      }}
      placement="bottomRight"
    >
      <Avatar
        style={{
          backgroundColor: '#f56a00',
          verticalAlign: 'middle',
          cursor: 'pointer',
        }}
        size="default"
        gap={4}
      >
        {session.data?.user?.fullname[0]}
      </Avatar>
    </Dropdown>
  );
}
