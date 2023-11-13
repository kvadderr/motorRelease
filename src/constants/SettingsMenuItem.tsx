import type { MenuProps } from 'antd';
import { AppstoreOutlined, MailOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const adminSettingsMenuItem: MenuItem[] = [
  getItem('Мой профиль', 'profile', <UserOutlined />),
  getItem('Пригласить', 'sub1', <MailOutlined />, [
    getItem('Администратора', 'invite_admin'),
    getItem('Аккаунт менеджера', 'invite_manager'),
    getItem('Франчайзера', 'invite_franchaisor'),
    getItem('Франчайзи', 'invite_franchaisee'),
    getItem('Сотрудника', 'invite_employee'),
  ]),
  getItem('Управление', 'sub2', <AppstoreOutlined />, [
    getItem('Сотрудники', 'employees'),
  ]),
  getItem('Выход', 'exit', <PoweroffOutlined />),

];