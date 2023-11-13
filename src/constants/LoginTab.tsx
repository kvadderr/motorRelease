import { LoginForm, LoginFranchaisorForm, RestorePasswordForm } from "../components/Forms";
import type { TabsProps } from 'antd';

export const loginTabs: TabsProps['items'] = [
  {
    key: '1',
    label: 'Войти',
    children: <LoginForm />,
  },
  {
    key: '2',
    label: 'Вход для франчайзера',
    children: <LoginFranchaisorForm />,
  },
  {
    key: '3',
    label: 'Забыли пароль',
    children: <RestorePasswordForm />,
  },
];
