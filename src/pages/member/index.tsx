import CommunityCard from '@/components/cards/CommunityCard';
import ListColum from '@/components/layouts/ListColumn';
import MemberLayout from '@/layouts/MemberLayout';
import { TCommentResponse } from '@/modules/master-data/comments/entities/response';
import { Row } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function MyCommunityPage() {
  const session = useSession();
  const router = useRouter();

  const redirectCommunity = (id: TCommentResponse['id']) => {
    router.push(`/member/my-communities/${id}`);
  };

  return (
    <MemberLayout title="My Community">
      <Row gutter={16}>
        {session.data?.user?.community.map((item) => (
          <ListColum key={item.id}>
            <div onClick={() => redirectCommunity(item.id)}>
              <CommunityCard name={item.name} />
            </div>
          </ListColum>
        ))}
      </Row>
    </MemberLayout>
  );
}
