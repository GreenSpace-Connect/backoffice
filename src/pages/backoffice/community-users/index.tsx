import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import CommunityUserForm from '@/modules/master-data/community-users/components/CommunityUserForm';
import { TCommunityUserParams } from '@/modules/master-data/community-users/entities/request';
import { TCommunityUserResponse } from '@/modules/master-data/community-users/entities/response';
import { useCommunityUserForm } from '@/modules/master-data/community-users/hooks/useForm';
import { useGetCommunityUsers } from '@/modules/master-data/community-users/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function CommunityUsersPage() {
  const filterHook = useTableFilter<
    TCommunityUserParams,
    TCommunityUserResponse
  >();
  const communityUserDataHook = useGetCommunityUsers({
    params: filterHook.params,
  });

  const {
    form,
    setFields,
    createMutation,
    onCreate,
    updateMutation,
    onUpdate,
    deleteMutation,
    onDelete,
  } = useCommunityUserForm(communityUserDataHook);

  return (
    <BackofficeLayout
      title="CommunityUsers"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'CommunityUsers' },
      ]}
      extra={
        <Space>
          <AsyncModal
            title="Update"
            button={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => form.resetFields()}
              >
                Add Item
              </Button>
            }
            mutation={createMutation}
            onSubmit={form.submit}
          >
            <CommunityUserForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
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
                    <AsyncModal
                      title="Update"
                      button={
                        <Button
                          icon={<EditOutlined />}
                          size="small"
                          type="link"
                          onClick={() => setFields(record)}
                        />
                      }
                      mutation={updateMutation}
                      onSubmit={form.submit}
                    >
                      <CommunityUserForm
                        form={form}
                        onFinish={() => onUpdate(record.id)}
                      />
                    </AsyncModal>

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
                  </Space>
                ),
              },
            ],
          }}
        />
      </Card>
    </BackofficeLayout>
  );
}
