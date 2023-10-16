import { Avatar, Dropdown, Layout } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';

export default function NavBar() {
  const session = useSession();

  return (
    <>
      <Layout.Header
        style={{ padding: '.5rem 1.5rem', background: 'transparent' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            height: '100%',
          }}
        >
          {session.status === 'authenticated' && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'setting',
                    label: 'Setting',
                    icon: <SettingOutlined />,
                    style: {
                      width: 150,
                    },
                  },
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
                {session.data.user?.fullname[0]}
              </Avatar>
            </Dropdown>
          )}
        </div>
      </Layout.Header>
    </>
  );
}
