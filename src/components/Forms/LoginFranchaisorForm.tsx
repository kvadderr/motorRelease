import { Form, Input, Button } from "antd"
import { useState } from "react";
import { useSendCodeMutation, useSignInMutation } from "../../api/auth";

const LoginFranchaisorForm = () => {

  const [isSendPassword, setIsSendPassword] = useState(false);
  const [signIn] = useSignInMutation();
  const [sendCode] = useSendCodeMutation();

  const sendForm = (values: any) => {
    if (!isSendPassword) {
      sendCode(values).unwrap;
      setIsSendPassword(true)
    } else {
      signIn(values).unwrap;
    }
  }

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={sendForm}
    >
      <Form.Item name="email">
        <Input addonBefore="Login or phone" />
      </Form.Item>
      {
        isSendPassword &&
        <Form.Item name="password">
          <Input.Password addonBefore="Password" />
        </Form.Item>
      }
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isSendPassword ? "Войти" : "Отправить код"}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginFranchaisorForm