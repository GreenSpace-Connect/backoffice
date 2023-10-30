import MyCommunityLayout from '@/layouts/MyCommunityLayout';
import store from '@/services/redux/store';

export default function MyCommunityPage() {
  return (
    <MyCommunityLayout title="My Community">
      {JSON.stringify(store.getState().userActived)}
    </MyCommunityLayout>
  );
}
