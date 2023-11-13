import { Form, Input, Button, App } from "antd"
import { useSignInMutation } from "../../api/auth";

const LoginForm = () => {
  const { notification } = App.useApp();
  const [signIn, { error, isLoading }] = useSignInMutation();

  const onFinish = async (values: any) => {
    await signIn(values).unwrap;
    if (error) {
      notification.info({
        message: `Ошибка входа`,
        description: 'К сожалению вход невозможен',
      });
    }
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
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input addonBefore="Login or phone" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password addonBefore="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm