import { Form, Input, Button } from "antd"
import { useState } from "react";

const LoginFranchaisorForm = () => {

  const [isSendPassword, setIsSendPassword] = useState(false);

  const sendForm = () => {
    setIsSendPassword(true)
  }

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item name="login">
        <Input addonBefore="Login or phone" />
      </Form.Item>
      {
        isSendPassword &&
        <Form.Item name="password">
          <Input.Password addonBefore="Password" />
        </Form.Item>
      }
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={sendForm}>
          {isSendPassword ? "Войти" : "Отправить код"}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginFranchaisorForm