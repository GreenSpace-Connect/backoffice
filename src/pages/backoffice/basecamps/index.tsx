import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import BasecampForm from '@/modules/master-data/basecamps/components/BasecampForm';
import { TBasecampParams } from '@/modules/master-data/basecamps/entities/request';
import { TBasecampResponse } from '@/modules/master-data/basecamps/entities/response';
import { useBasecampForm } from '@/modules/master-data/basecamps/hooks/useForm';
import { useGetBasecamps } from '@/modules/master-data/basecamps/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function BasecampsPage() {
  const filterHook = useTableFilter<TBasecampParams, TBasecampResponse>();
  const basecampDataHook = useGetBasecamps({
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
  } = useBasecampForm(basecampDataHook);

  return (
    <BackofficeLayout
      title="Basecamps"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'Basecamps' },
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
            <BasecampForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: basecampDataHook.data?.items,
            loading: basecampDataHook.isFetching,
            pagination: basecampDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TBasecampResponse>(),
              {
                title: 'Community',
                render: (_, record) => (
                  <Typography.Text>{record.community.name}</Typography.Text>
                ),
              },
              {
                title: 'Green Place',
                render: (_, record) => (
                  <Typography.Text>{record.greenPlace.name}</Typography.Text>
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
                      <BasecampForm
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
