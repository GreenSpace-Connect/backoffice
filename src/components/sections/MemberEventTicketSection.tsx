import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { TTicketParams } from '@/modules/master-data/tickets/entities/request';
import { TTicketResponse } from '@/modules/master-data/tickets/entities/response';
import { useGetTickets } from '@/modules/master-data/tickets/hooks/useQuery';
import { useTableFilter } from '@/utils/hooks/useFilter';
import TitleNavigation from '../navigations/TitleNavigation';
import { Button, Space, Typography } from 'antd';
import Datatable from '../tables/Datatable';
import { getnumberColumn } from '@/services/antd/table';
import AsyncModal from '../modals/AsyncModal';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import TicketForm from '@/modules/master-data/tickets/components/TicketForm';
import { useTicketForm } from '@/modules/master-data/tickets/hooks/useForm';
import { confirmDelete } from '@/services/antd/confirm';

type MemberEventTicketSectionProps = {
  eventId?: TEventResponse['id'];
};

export default function MemberEventTicketSection(
  props: MemberEventTicketSectionProps,
) {
  const { eventId } = props;

  const filterHook = useTableFilter<TTicketParams, TTicketResponse>();
  const ticketDataHook = useGetTickets({
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
  } = useTicketForm(ticketDataHook);

  return (
    <div>
      <TitleNavigation
        title="My Tickets"
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
              <TicketForm form={form} eventId={eventId} onFinish={onCreate} />
            </AsyncModal>
          </Space>
        }
      />

      <Datatable
        onSearch={(value) => filterHook.onChange('search', value)}
        tableProps={{
          dataSource: ticketDataHook.data?.items,
          loading: ticketDataHook.isFetching,
          pagination: ticketDataHook.data?.meta,
          onChange: filterHook.pagination.onChange,
          columns: [
            getnumberColumn<TTicketResponse>(),
            { title: 'Name', dataIndex: 'name' },
            {
              title: 'Price',
              render: (_, record) => (
                <Typography.Text>Rp {record.price}</Typography.Text>
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
                    <TicketForm
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
