import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import TicketTransactionForm from '@/modules/master-data/ticket-transactions/components/TicketTransactionForm';
import { TTicketTransactionParams } from '@/modules/master-data/ticket-transactions/entities/request';
import { TTicketTransactionResponse } from '@/modules/master-data/ticket-transactions/entities/response';
import { useTicketTransactionForm } from '@/modules/master-data/ticket-transactions/hooks/useForm';
import { useGetTicketTransactions } from '@/modules/master-data/ticket-transactions/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function TicketTransactionsPage() {
  const filterHook = useTableFilter<
    TTicketTransactionParams,
    TTicketTransactionResponse
  >();
  const ticketTransactionDataHook = useGetTicketTransactions({
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
  } = useTicketTransactionForm(ticketTransactionDataHook);

  return (
    <BackofficeLayout
      title="TicketTransactions"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'TicketTransactions' },
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
            <TicketTransactionForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: ticketTransactionDataHook.data?.items,
            loading: ticketTransactionDataHook.isFetching,
            pagination: ticketTransactionDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TTicketTransactionResponse>(),
              {
                title: 'Ticket',
                render: (_, record) => (
                  <Typography.Text>{record.ticket.name}</Typography.Text>
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
                      <TicketTransactionForm
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
