import { TCommunityResponse } from '@/modules/master-data/communities/entities/response';
import { TEventParams } from '@/modules/master-data/events/entities/request';
import { TEventResponse } from '@/modules/master-data/events/entities/response';
import { useGetEvents } from '@/modules/master-data/events/hooks/useQuery';
import { useTableFilter } from '@/utils/hooks/useFilter';
import Datatable from '../tables/Datatable';
import { getnumberColumn } from '@/services/antd/table';
import { Button, Image, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { confirmDelete } from '@/services/antd/confirm';
import { useEventForm } from '@/modules/master-data/events/hooks/useForm';
import TitleNavigation from '../navigations/TitleNavigation';
import AsyncModal from '../modals/AsyncModal';
import EventForm from '@/modules/master-data/events/components/EventForm';

type MemberEventSectionProps = {
  communityId: TCommunityResponse['id'];
};

export default function MemberEventSection(props: MemberEventSectionProps) {
  const { communityId } = props;

  const filterHook = useTableFilter<TEventParams, TEventResponse>();
  const eventDataHook = useGetEvents({
    params: {
      ...filterHook.params,
      communityId,
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
  } = useEventForm(eventDataHook);

  return (
    <div>
      <TitleNavigation
        title="My Event"
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
              <EventForm
                form={form}
                communityId={communityId}
                onFinish={onCreate}
              />
            </AsyncModal>
          </Space>
        }
      />

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
              title: 'Thumbnail',
              render: (_, record) => (
                <Image src={record.thumbnail} width={100} height={100} />
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
                      communityId={communityId}
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
