import { Form, Input, Button, Select } from "antd"
import { useSignUpMutation } from "../../api/auth";
import { useAppSelector } from "../../store/storeHooks";
import { selectCurrentRole } from "../../store/slices/authSlice";
import { selectFranchaisorList } from "../../store/slices/franchisorSlice";
import { ROLE } from "../../@types/entities/Role";

const RegisterFranchaiseeForm = () => {
  const [signUp, { isLoading }] = useSignUpMutation();

  const role = useAppSelector(selectCurrentRole) || ROLE.EMPLOYEE;
  const franchaisorList = useAppSelector(selectFranchaisorList);
  const franchisorData = franchaisorList?.map((franchisor) => ({ label: franchisor.company + "; " + franchisor.FIO, value: franchisor.user_id }));

  const onFinish = async (values: any) => {
    values.role = 'franchisee';
    values.franchisee = {
      franchisor_id: values.franchisor_id,
    }
    //if (role === ROLE.FRANCHISOR) values.franchisor_id = 1;
    await signUp(values).unwrap;
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      {
        role !== ROLE.FRANCHISOR &&
        <Form.Item
          name="franchisor_id"
          rules={[{ required: true, message: 'Please input email!' }]}>
          <Select
            placeholder="Выберите франчайзера"
            style={{ width: '100%' }}
            options={franchisorData}
          />
        </Form.Item>
      }
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input email!' }]}
      >
        <Input addonBefore="Email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Пригласить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterFranchaiseeForm