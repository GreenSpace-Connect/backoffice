import MemberLayout from '@/layouts/MemberLayout';
import { useGetCommunityDetails } from '@/modules/master-data/communities/hooks/useQuery';
import { useRouter } from 'next/router';

export default function MyCommunityPage() {
  const router = useRouter();

  const communityDetail = useGetCommunityDetails({
    id: Number(router.query.slug),
    options: {
      onError: () => {
        router.push('/member');
      },
    },
  });

  return (
    <MemberLayout title={communityDetail.data?.data.name || ''}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
      asperiores, dolore neque autem iusto qui porro quia. Quod iste, dolores
      magnam ratione nihil ex temporibus doloribus? Officiis facere nisi magni
      ut! Quasi ut distinctio aspernatur suscipit deserunt non! Magnam voluptate
      recusandae numquam laboriosam totam, iste reprehenderit ex perspiciatis
      beatae sit eligendi cumque suscipit sequi optio eum itaque accusamus iure
      ipsam facere, doloribus qui, dolorem animi aperiam quasi! Commodi, ullam!
      Maxime animi facere libero tenetur, molestias ipsum ducimus est? Eveniet
      nesciunt quia dolore vitae obcaecati minus aliquam blanditiis quis est,
      quod nobis ipsum error maiores pariatur accusamus. Sed inventore
      distinctio nemo!
    </MemberLayout>
  );
}
