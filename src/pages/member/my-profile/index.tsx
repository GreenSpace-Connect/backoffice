import MemberLayout from '@/layouts/MemberLayout';
import UserForm from '@/modules/master-data/users/components/UserForm';
import { useUserForm } from '@/modules/master-data/users/hooks/useForm';
import { useGetUserDetails } from '@/modules/master-data/users/hooks/useQuery';
import { Button, Col, Row } from 'antd';
import { useSession } from 'next-auth/react';

export default function MyProfilePage() {
  const session = useSession();
  const userId = Number(session.data?.user?.id);

  const userDetailsHook = useGetUserDetails({
    id: userId,
    options: {
      onSuccess: (data) => {
        setFields(data.data);
      },
    },
  });

  const { form, setFields, updateMutation, onUpdate } =
    useUserForm(userDetailsHook);

  return (
    <MemberLayout title="My Profile">
      <Row>
        <Col xs={12}>
          <UserForm
            form={form}
            roleId={userDetailsHook.data?.data.role.id}
            onFinish={() => onUpdate(userId)}
            hidePassword
          />

          <Button
            type="primary"
            htmlType="submit"
            loading={updateMutation.isLoading}
            onClick={form.submit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </MemberLayout>
  );
}
