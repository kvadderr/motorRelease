import { Form, Input, Button } from "antd"
import { useSignUpMutation } from "../../api/auth";

const RegisterFranchaisorForm = () => {
  const [signUp, { isLoading }] = useSignUpMutation();

  const onFinish = async (values: any) => {
    values.role = 'franchisor';
    values.franchisor = {
      FIO: values.FIO,
      company: values.company
    }
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
        rules={[{ required: true, message: 'Please input login!' }]}
      >
        <Input addonBefore="Email" />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input phone!' }]}
      >
        <Input addonBefore="Phone" />
      </Form.Item>
      <Form.Item
        name="FIO"
        rules={[{ required: true, message: 'Please input FIO!' }]}
      >
        <Input addonBefore="FIO" />
      </Form.Item>
      <Form.Item
        name="company"
        rules={[{ required: true, message: 'Please input company name!' }]}
      >
        <Input addonBefore="Company" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Пригласить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterFranchaisorForm