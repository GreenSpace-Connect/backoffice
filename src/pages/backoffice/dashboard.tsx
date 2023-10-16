import BackofficeLayout from '@/layouts/BackofficeLayout';
import { Typography } from 'antd';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const session = useSession();

  return (
    <BackofficeLayout title="Dashboard" breadcrumbs={[{ title: 'Dashboard' }]}>
      <Typography.Text>{JSON.stringify(session.data?.user)}</Typography.Text>
    </BackofficeLayout>
  );
}
