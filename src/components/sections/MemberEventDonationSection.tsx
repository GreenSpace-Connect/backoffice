import { TDonationParams } from '@/modules/master-data/donations/entities/request';
import { TDonationResponse } from '@/modules/master-data/donations/entities/response';
import { useDonationForm } from '@/modules/master-data/donations/hooks/useForm';
import { useGetDonations } from '@/modules/master-data/donations/hooks/useQuery';
import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { useTableFilter } from '@/utils/hooks/useFilter';
import TitleNavigation from '../navigations/TitleNavigation';
import { Button, Space } from 'antd';
import AsyncModal from '../modals/AsyncModal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DonationForm from '@/modules/master-data/donations/components/DonationForm';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import Datatable from '../tables/Datatable';

type MemberEventDonationSectionProps = {
  eventId?: TEventResponse['id'];
};

export default function MemberEventDonationSection(
  props: MemberEventDonationSectionProps,
) {
  const { eventId } = props;

  const filterHook = useTableFilter<TDonationParams, TDonationResponse>();
  const donationDataHook = useGetDonations({
    params: {
      ...filterHook.params,
      eventId,
    },
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
    <div>
      <TitleNavigation
        title="Open Donations"
        extra={
          <Space>
            <AsyncModal
              title="Update"
              button={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    form.resetFields();
                    form?.setFieldValue('eventId', eventId);
                  }}
                >
                  Add Item
                </Button>
              }
              mutation={createMutation}
              onSubmit={form.submit}
            >
              <DonationForm form={form} eventId={eventId} onFinish={onCreate} />
            </AsyncModal>
          </Space>
        }
      />

      <Datatable
        onSearch={(value) => filterHook.onChange('search', value)}
        tableProps={{
          dataSource: donationDataHook.data?.items,
          loading: donationDataHook.isFetching,
          pagination: donationDataHook.data?.meta,
          onChange: filterHook.pagination.onChange,
          columns: [
            getnumberColumn<TDonationResponse>(),
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
                      eventId={eventId}
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
    </div>
  );
}
