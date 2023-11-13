import { Form, Input, Button } from "antd"
import { useState } from "react";

const RestorePasswordForm = () => {

  const [email, setEmail] = useState('')

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        name="login"
        rules={[{ required: true, message: 'Please input your login!' }]}
      >
        <Input addonBefore="Login or phone" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Восстановить пароль
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RestorePasswordForm