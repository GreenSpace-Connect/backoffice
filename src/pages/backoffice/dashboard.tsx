import { OwnUpload } from '@/components/inputs/OwnUpload';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import { FilePlace } from '@/modules/upload/constant';
import { Typography } from 'antd';

export default function Dashboard() {
  return (
    <BackofficeLayout title="Dashboard">
      <Typography.Text></Typography.Text>
      <OwnUpload filePlace={FilePlace.Events} />
    </BackofficeLayout>
  );
}
