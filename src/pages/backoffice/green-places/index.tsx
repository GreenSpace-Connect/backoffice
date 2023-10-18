import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import GreenPlaceForm from '@/modules/master-data/green-places/components/GreenPlaceForm';
import { TGreenPlaceParams } from '@/modules/master-data/green-places/entities/request';
import { TGreenPlaceResponse } from '@/modules/master-data/green-places/entities/response';
import { useGreenPlaceForm } from '@/modules/master-data/green-places/hooks/useForm';
import { useGetGreenPlaces } from '@/modules/master-data/green-places/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';

export default function GreenPlacesPage() {
  const filterHook = useTableFilter<TGreenPlaceParams, TGreenPlaceResponse>();
  const greenPlaceDataHook = useGetGreenPlaces({
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
  } = useGreenPlaceForm(greenPlaceDataHook);

  return (
    <BackofficeLayout
      title="GreenPlaces"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'GreenPlaces' },
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
            <GreenPlaceForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: greenPlaceDataHook.data?.items,
            loading: greenPlaceDataHook.isFetching,
            pagination: greenPlaceDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TGreenPlaceResponse>(),
              { title: 'Name', dataIndex: 'name' },
              { title: 'Address', dataIndex: 'address' },
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
                      <GreenPlaceForm
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
