import { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
const { Content, Sider } = Layout;
import { logout } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/storeHooks";
import { adminSettingsMenuItem } from "../constants/SettingsMenuItem";
import { Group, Profile, Workspace } from "../components/Settings";
import { RegisterAdminForm, RegisterManagerForm, RegisterFranchaiseeForm, RegisterFranchaisorForm, RegisterEmployeeForm } from "../components/Forms";

const Settings = () => {

  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState('profile');

  useEffect(() => {
    if (current === 'exit') {
      //socket.disconnect();
      dispatch(logout())
    }
  }, [current])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  };

  const Render = () => {
    switch (current) {
      case 'profile':
        return <Profile />
      case 'invite_admin':
        return <RegisterAdminForm />
      case 'invite_manager':
        return <RegisterManagerForm />
      case 'invite_franchaisor':
        return <RegisterFranchaisorForm />
      case 'invite_franchaisee':
        return <RegisterFranchaiseeForm />
      case 'invite_employee':
        return <RegisterEmployeeForm />
      case 'workspace':
        return <Workspace />
      case 'groups':
        return <Group />
      default:
        break;
    }
  }


  return (
    <>
      <Sider width={250} theme='light'>
        <Menu
          theme={'light'}
          style={{ width: '100%' }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          onClick={onClick}
          mode="inline"
          items={adminSettingsMenuItem}
        />
      </Sider>
      <Content style={{ margin: 20, padding: 20, borderRadius: 10, backgroundColor: '#fff' }}>
        <Render />
      </Content>
    </>
  )
}

export default Settings