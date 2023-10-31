import { TCommunityResponse } from '@/modules/master-data/communities/entities/response';
import { TBasecampParams } from '@/modules/master-data/basecamps/entities/request';
import { TBasecampResponse } from '@/modules/master-data/basecamps/entities/response';
import { useGetBasecamps } from '@/modules/master-data/basecamps/hooks/useQuery';
import { useTableFilter } from '@/utils/hooks/useFilter';
import Datatable from '../tables/Datatable';
import { getnumberColumn } from '@/services/antd/table';
import { Button, Space, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { confirmDelete } from '@/services/antd/confirm';
import { useBasecampForm } from '@/modules/master-data/basecamps/hooks/useForm';
import TitleNavigation from '../navigations/TitleNavigation';
import AsyncModal from '../modals/AsyncModal';
import BasecampForm from '@/modules/master-data/basecamps/components/BasecampForm';

type MemberBasecampSectionProps = {
  communityId: TCommunityResponse['id'];
};

export default function MemberBasecampSection(
  props: MemberBasecampSectionProps,
) {
  const { communityId } = props;

  const filterHook = useTableFilter<TBasecampParams, TBasecampResponse>();
  const basecampDataHook = useGetBasecamps({
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
  } = useBasecampForm(basecampDataHook);

  return (
    <div>
      <TitleNavigation
        title="My Basecamp"
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
              <BasecampForm
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
          dataSource: basecampDataHook.data?.items,
          loading: basecampDataHook.isFetching,
          pagination: basecampDataHook.data?.meta,
          onChange: filterHook.pagination.onChange,
          columns: [
            getnumberColumn<TBasecampResponse>(),
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
