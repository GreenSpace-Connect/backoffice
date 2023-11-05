import AsyncModal from '@/components/modals/AsyncModal';
import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import DonationForm from '@/modules/master-data/donations/components/DonationForm';
import { TDonationParams } from '@/modules/master-data/donations/entities/request';
import { TDonationResponse } from '@/modules/master-data/donations/entities/response';
import { useDonationForm } from '@/modules/master-data/donations/hooks/useForm';
import { useGetDonations } from '@/modules/master-data/donations/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';

export default function DonationsPage() {
  const filterHook = useTableFilter<TDonationParams, TDonationResponse>();
  const donationDataHook = useGetDonations({
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
  } = useDonationForm(donationDataHook);

  return (
    <BackofficeLayout
      title="Donations"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'Donations' },
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
            <DonationForm form={form} onFinish={onCreate} />
          </AsyncModal>
        </Space>
      }
    >
      <Card>
        <Datatable
          onSearch={(value) => filterHook.onChange('search', value)}
          tableProps={{
            dataSource: donationDataHook.data?.items,
            loading: donationDataHook.isFetching,
            pagination: donationDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TDonationResponse>(),
              {
                title: 'Event',
                render: (_, record) => (
                  <Typography.Text>{record.event.name}</Typography.Text>
                ),
              },
              { title: 'Name', dataIndex: 'name' },
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
                      <DonationForm
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
