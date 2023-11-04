'use client';

import { removeUndefinedProperties } from '@/utils/helpers/object.helper';
import { Button, Form, Input, Layout, Typography, theme } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthDropdown from '../dropdowns/AuthDropdown';
import { useEffect, useState } from 'react';

export default function FrontNavbar() {
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const router = useRouter();
  const session = useSession();

  const onSubmit = () => {
    router.push({
      pathname: '/search',
      query: removeUndefinedProperties({
        ...router.query,
        search,
      }),
    });
  };

  useEffect(() => {
    if (router.query.search) {
      setSearch(String(router.query.search));
    }
  }, [router.query]);

  const [search, setSearch] = useState('');

  return (
    <Layout.Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colorBgContainer,
        height: '70px',
        gap: '2rem',
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: 0,
          fontWeight: 700,
          color: colorPrimary,
          cursor: 'pointer',
        }}
        onClick={() => router.push('/')}
      >
        GreenSpace Connect
      </Typography.Title>

      <Form onSubmitCapture={onSubmit}>
        <Input
          placeholder="Cari di GreenSpace Connect"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{
            maxWidth: '500px',
            minWidth: '400px',
            borderRadius: '40px',
            paddingLeft: '2rem',
            paddingRight: '2rem',
          }}
        />
      </Form>
      <div>
        {session.status === 'authenticated' ? (
          <AuthDropdown />
        ) : (
          <Link href="/login">
            <Button
              type="primary"
              shape="round"
              style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
            >
              Connect
            </Button>
          </Link>
        )}
      </div>
    </Layout.Header>
  );
}
