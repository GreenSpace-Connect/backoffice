import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import EventForm from '@/modules/master-data/events/components/EventForm';
import { TEventParams } from '@/modules/master-data/events/entities/request';
import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { useEventForm } from '@/modules/master-data/events/hooks/useForm';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function EventsPage() {
  const filterHook = useTableFilter<TEventParams, TEventResponse>();
  const eventDataHook = useGetEvents({
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
  } = useEventForm(eventDataHook);

  return (
    <BackofficeLayout
      title="Events"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'Events' },
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
            <EventForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: eventDataHook.data?.items,
            loading: eventDataHook.isFetching,
            pagination: eventDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TEventResponse>(),
              { title: 'Name', dataIndex: 'name' },
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
                      <EventForm
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
