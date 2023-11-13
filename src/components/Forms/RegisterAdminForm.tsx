import { Form, Input, Button } from "antd"
import { useSignUpMutation } from "../../api/auth";

const RegisterAdminForm = () => {
  const [signUp, { isLoading }] = useSignUpMutation();

  const onFinish = async (values: any) => {
    values.role = 'admin';
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
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input email!' }]}
      >
        <Input addonBefore="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input password!' }]}
      >
        <Input.Password addonBefore="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Пригласить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterAdminForm