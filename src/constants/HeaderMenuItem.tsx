import { MenuProps } from "antd"
import { AppstoreOutlined, MailOutlined, DatabaseOutlined } from '@ant-design/icons';

export const headerMenuItems: MenuProps['items'] = [
  {
    label: 'Курсы',
    key: 'course',
    icon: <MailOutlined />,
  },
  {
    label: 'База знаний',
    key: 'db',
    icon: <DatabaseOutlined />,
  },
  {
    label: 'HR MOTOR',
    key: 'settings',
    icon: <AppstoreOutlined />,
  }
]