import Datatable from '@/components/tables/Datatable';
import BackofficeLayout from '@/layouts/BackofficeLayout';
import { TUserParams } from '@/modules/master-data/users/entities/request';
import { TUserResponse } from '@/modules/master-data/users/entities/response';
import { useUserForm } from '@/modules/master-data/users/hooks/useForm';
import { useGetUsers } from '@/modules/master-data/users/hooks/useQuery';
import { confirmDelete } from '@/services/antd/confirm';
import { getnumberColumn } from '@/services/antd/table';
import { useTableFilter } from '@/utils/hooks/useFilter';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';

export default function Dashboard() {
  const filterHook = useTableFilter<TUserParams, TUserResponse>();
  const userDataHook = useGetUsers({});

  const { deleteMutation, onDelete } = useUserForm(userDataHook);

  return (
    <BackofficeLayout
      title="Users"
      breadcrumbs={[
        { title: 'Dashboard', href: '/backoffice/dashboard' },
        { title: 'Users' },
      ]}
      extra={
        <>
          <Button type="primary" icon={<PlusOutlined />}>
            Add
          </Button>
        </>
      }
    >
      <Card>
        <Datatable
          tableProps={{
            dataSource: userDataHook.data?.items,
            loading: userDataHook.isFetching,
            pagination: userDataHook.data?.meta,
            onChange: filterHook.pagination.onChange,
            columns: [
              getnumberColumn<TUserResponse>(),
              { title: 'Email', dataIndex: 'email' },
              { title: 'Full Name', dataIndex: 'fullname' },
              {
                title: 'Action',
                dataIndex: 'id',
                width: 50,
                align: 'right',
                fixed: 'right',
                render: (_, record) => (
                  <Space>
                    {/* <AsyncModal
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
                      <UserForm form={form} onFinish={() => onUpdate(record.id)} />
                    </AsyncModal> */}

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
