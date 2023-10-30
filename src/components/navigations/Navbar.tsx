import { Layout } from 'antd';
import { useSession } from 'next-auth/react';
import AuthDropdown from '../dropdowns/AuthDropdown';

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
          {session.status === 'authenticated' && <AuthDropdown />}
        </div>
      </Layout.Header>
    </>
  );
}
