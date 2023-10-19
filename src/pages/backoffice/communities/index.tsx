import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import CommunityForm from '@/modules/master-data/communities/components/CommunityForm';
import { TCommunityParams } from '@/modules/master-data/communities/entities/request';
import { TCommunityResponse } from '@/modules/master-data/communities/entities/response';
import { useCommunityForm } from '@/modules/master-data/communities/hooks/useForm';
import { useGetCommunities } from '@/modules/master-data/communities/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function CommunitiesPage() {
  const filterHook = useTableFilter<TCommunityParams, TCommunityResponse>();
  const provinceDataHook = useGetCommunities({
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
  } = useCommunityForm(provinceDataHook);

  return (
    <BackofficeLayout
      title="Communities"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'Communities' },
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
            <CommunityForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: provinceDataHook.data?.items,
            loading: provinceDataHook.isFetching,
            pagination: provinceDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TCommunityResponse>(),
              { title: 'Name', dataIndex: 'name' },
              {
                title: 'PIC',
                render: (_, record) => (
                  <Typography.Text>{`${record.pic.fullname} - ${record.pic.email}`}</Typography.Text>
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
                      <CommunityForm
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
