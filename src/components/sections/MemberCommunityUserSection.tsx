import { TCommunityResponse } from '@/modules/master-data/communities/entities/response';
import CommunityUserForm from '@/modules/master-data/community-users/components/CommunityUserForm';
import { TCommunityUserParams } from '@/modules/master-data/community-users/entities/request';
import { TCommunityUserResponse } from '@/modules/master-data/community-users/entities/response';
import { useCommunityUserForm } from '@/modules/master-data/community-users/hooks/useForm';
import { useGetCommunityUsers } from '@/modules/master-data/community-users/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Button, Typography } from 'antd';
import AsyncModal from '../modals/AsyncModal';
import TitleNavigation from '../navigations/TitleNavigation';
import Datatable from '../tables/Datatable';
import { useSession } from 'next-auth/react';

type MemberCommunityUserSectionProps = {
  communityId: TCommunityResponse['id'];
};

export default function MemberCommunityUserSection(
  props: MemberCommunityUserSectionProps,
) {
  const { communityId } = props;

  const session = useSession();

  const filterHook = useTableFilter<
    TCommunityUserParams,
    TCommunityUserResponse
  >();
  const communityUserDataHook = useGetCommunityUsers({
    params: {
      ...filterHook.params,
      communityId,
    },
  });

  const { form, createMutation, onCreate, deleteMutation, onDelete } =
    useCommunityUserForm(communityUserDataHook);

  return (
    <div>
      <TitleNavigation
        title="Our Member"
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
                    form?.setFieldValue('communityId', communityId);
                  }}
                >
                  Add Item
                </Button>
              }
              mutation={createMutation}
              onSubmit={form.submit}
            >
              <CommunityUserForm
                form={form}
                communityId={communityId}
                onFinish={onCreate}
              />
            </AsyncModal>
          </Space>
        }
      />

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
              title: 'User',
              render: (_, record) => (
                <Typography.Text>
                  {record.user.fullname} - {record.user.email}
                </Typography.Text>
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
                  {record.user.id !== session.data?.user?.id && (
                    <Button
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
                    />
                  )}
                </Space>
              ),
            },
          ],
        }}
      />
    </div>
  );
}
