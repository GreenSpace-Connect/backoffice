import CommunityCard from '@/components/cards/CommunityCard';
import ListColum from '@/components/layouts/ListColumn';
import MyCommunityLayout from '@/layouts/MyCommunityLayout';
import { TCommentResponse } from '@/modules/master-data/comments/entities/response';
import { chnageCommunityActived } from '@/services/redux/reducers/userReducer';
import store from '@/services/redux/store';
import { Row } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function MyCommunityPage() {
  const session = useSession();
  const router = useRouter();

  const redirectCommunity = (id: TCommentResponse['id']) => {
    router.push(`/my-community/${id}`);
    store.dispatch(chnageCommunityActived(id));
  };

  return (
    <MyCommunityLayout title="My Community">
      {JSON.stringify(store.getState().userActived)}
      <Row gutter={16}>
        {session.data?.user?.community.map((item) => (
          <ListColum key={item.id}>
            <div onClick={() => redirectCommunity(item.id)}>
              <CommunityCard name={item.name} />
            </div>
          </ListColum>
        ))}
      </Row>
    </MyCommunityLayout>
  );
}
