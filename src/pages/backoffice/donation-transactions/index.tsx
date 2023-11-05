import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import DonationTransactionForm from '@/modules/master-data/donation-transactions/components/DonationTransactionForm';
import { TDonationTransactionParams } from '@/modules/master-data/donation-transactions/entities/request';
import { TDonationTransactionResponse } from '@/modules/master-data/donation-transactions/entities/response';
import { useDonationTransactionForm } from '@/modules/master-data/donation-transactions/hooks/useForm';
import { useGetDonationTransactions } from '@/modules/master-data/donation-transactions/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { convertToIdr } from '@/utils/helpers/string.helper';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function DonationTransactionsPage() {
  const filterHook = useTableFilter<
    TDonationTransactionParams,
    TDonationTransactionResponse
  >();
  const donationTransactionDataHook = useGetDonationTransactions({
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
  } = useDonationTransactionForm(donationTransactionDataHook);

  return (
    <BackofficeLayout
      title="DonationTransactions"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'DonationTransactions' },
      ]}
      extra={
        <Space>
          <AsyncModal
            title="Insert"
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
            <DonationTransactionForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: donationTransactionDataHook.data?.items,
            loading: donationTransactionDataHook.isFetching,
            pagination: donationTransactionDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TDonationTransactionResponse>(),
              {
                title: 'Donation',
                render: (_, record) => (
                  <Typography.Text>{record.donation.name}</Typography.Text>
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
                title: 'Amount',
                render: (_, record) => (
                  <Typography.Text>
                    {convertToIdr(record.amount)}
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
                      <DonationTransactionForm
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
