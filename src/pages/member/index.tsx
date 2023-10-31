import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import MemberLayout from '@/layouts/MemberLayout';
import CommunityForm from '@/modules/master-data/communities/components/CommunityForm';
import { useCommunityForm } from '@/modules/master-data/communities/hooks/useForm';
import { TCommunityUserParams } from '@/modules/master-data/community-users/entities/request';
import { TCommunityUserResponse } from '@/modules/master-data/community-users/entities/response';
import { useGetCommunityUsers } from '@/modules/master-data/community-users/hooks/useQuery';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function MyCommunityPage() {
  const session = useSession();
  const router = useRouter();

  const filterHook = useTableFilter<
    TCommunityUserParams,
    TCommunityUserResponse
  >();
  const communityUserDataHook = useGetCommunityUsers({
    params: {
      ...filterHook.params,
      userId: session.data?.user?.id,
    },
  });

  const { form, createMutation, onCreate } = useCommunityForm(
    communityUserDataHook,
  );

  return (
    <MemberLayout
      title="My Community"
      extra={
        <Space>
          <AsyncModal
            title="Insert"
            button={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  form.resetFields();
                  form.setFieldValue('picId', session.data?.user?.id);
                }}
              >
                Add Item
              </Button>
            }
            mutation={createMutation}
            onSubmit={form.submit}
          >
            <CommunityForm
              form={form}
              picId={session.data?.user?.id}
              onFinish={onCreate}
            />
          </AsyncModal>
        </Space>
      }
    >
      <Datatable
        onSearch={(value) => filterHook.onChange('search', value)}
        tableProps={{
          dataSource: communityUserDataHook.data?.items,
          loading: communityUserDataHook.isFetching,
          pagination: communityUserDataHook.data?.meta,
          onChange: filterHook.pagination.onChange,
          columns: [
            getnumberColumn<TCommunityUserResponse>(),
            {
              title: 'Community',
              render: (_, record) => (
                <Typography.Text>{record.community.name}</Typography.Text>
              ),
            },
            {
              title: 'Action',
              dataIndex: 'id',
              width: 50,
              align: 'right',
              fixed: 'right',
              render: (_, record) => (
                <Space>
                  <Button
                    icon={<EyeOutlined />}
                    size="small"
                    type="link"
                    onClick={() =>
                      router.push(
                        `/member/my-communities/${record.community.id}`,
                      )
                    }
                  />

                  {/* <Button
                    icon={<DeleteOutlined />}
                    size="small"
                    type="link"
                    danger
                    loading={deleteMutation.isLoading}
                    onClick={() => {
                      confirmDelete({
                        onOk: () => onDelete(record.id),
                      });
                    }}
                  /> */}
                </Space>
              ),
            },
          ],
        }}
      />
    </MemberLayout>
  );
}
