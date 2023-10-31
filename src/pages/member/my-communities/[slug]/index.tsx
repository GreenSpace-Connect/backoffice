import AsyncModal from '@/components/modals/AsyncModal';
import MemberBasecampSection from '@/components/sections/MemberBasecampSection';
import MemberCommunityUserSection from '@/components/sections/MemberCommunityUserSection';
import MemberEventSection from '@/components/sections/MemberEventSection';
import MemberLayout from '@/layouts/MemberLayout';
import CommunityForm from '@/modules/master-data/communities/components/CommunityForm';
import { useCommunityForm } from '@/modules/master-data/communities/hooks/useForm';
import { useGetCommunityDetails } from '@/modules/master-data/communities/hooks/useQuery';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function MyCommunityPage() {
  const session = useSession();
  const router = useRouter();
  const communityId = Number(router.query.slug);

  const { form, setFields, updateMutation, onUpdate } = useCommunityForm();

  const communityDetail = useGetCommunityDetails({
    id: communityId,
    options: {
      onSuccess: (data) => {
        setFields(data.data);
      },
      onError: () => {
        router.push('/member');
      },
    },
  });

  const canUpdateCommunity =
    communityDetail.data?.data &&
    communityDetail.data?.data.pic.id === session.data?.user?.id;

  return (
    <MemberLayout
      title={
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Avatar src={communityDetail.data?.data.photo} size={64} />
          {communityDetail.data?.data.name}
          {communityDetail.data?.data && canUpdateCommunity && (
            <AsyncModal
              title="Update"
              button={
                <Button
                  type="link"
                  size="large"
                  icon={<EditOutlined />}
                  onClick={() => setFields(communityDetail.data?.data)}
                />
              }
              mutation={updateMutation}
              onSubmit={form.submit}
            >
              <CommunityForm
                form={form}
                onFinish={() => onUpdate(communityDetail.data?.data.id)}
              />
            </AsyncModal>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <MemberEventSection communityId={communityId} />

        <MemberCommunityUserSection communityId={communityId} />

        <MemberBasecampSection communityId={communityId} />
      </div>
    </MemberLayout>
  );
}
