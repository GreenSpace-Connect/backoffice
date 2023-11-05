import {
  CreditCardOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Avatar, DropdownProps } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
      {
        key: 'my-profile',
        label: 'My Profile',
        icon: <UserOutlined />,
        style: {
          width: 150,
        },
        onClick: () => router.push('/member/my-profile'),
      },
      {
        key: 'my-transactions',
        label: 'My Transactions',
        icon: <CreditCardOutlined />,
        style: {
          width: 150,
        },
        onClick: () => router.push('/member/my-transactions'),
      },
    ],
  };

  if (session.data?.user?.community.length) {
    menu.items?.push({
      key: 'member',
      label: 'My Community',
      icon: <SettingOutlined />,
      style: {
        width: 150,
      },
      onClick: () => router.push(`/member`),
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
