import { Flex, Typography, Image, Space, Tabs } from 'antd';
import { loginTabs } from '../constants/LoginTab';
const { Title } = Typography;

const Login = () => {
  return (
    <Flex justify='center' align='center' gap={'middle'} style={{ minHeight: '100vh' }}>
      <Image width={400} preview={false} src="https://motorlms.ru/img/mobile_desktop.svg" />
      <Space direction='vertical' >
        <Title level={5}>Добро пожаловать в LMS MOTOR</Title>
        <Tabs defaultActiveKey="1" items={loginTabs} />
      </Space>
    </Flex>
  )
}

export default Login