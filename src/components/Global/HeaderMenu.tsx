import { Layout, Menu, Flex, Typography, MenuProps } from "antd"
import { headerMenuItems } from "../../constants/HeaderMenuItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/storeHooks";
import { setCurretPage } from "../../store/slices/authSlice";
const { Header } = Layout;
const { Title } = Typography;

const HeaderMenu = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(setCurretPage(e.key));
    navigate(e.key)
  };

  return (
    <Header style={{
      position: 'sticky',
      top: 0,
      paddingLeft: 20,
      paddingRight: 20,
      zIndex: 1,
      width: '100%',
      borderBottomColor: '#000',
      borderBottomWidth: 2,
      borderWidth: 4,
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)"
    }} >
      <Flex align='center' justify='space-between'>
        <Title level={4} style={{ textAlign: 'center', marginTop: 16 }}>Motor</Title>
        <Menu
          theme="light"
          onClick={onClick}
          mode="horizontal"
          items={headerMenuItems}
        />
      </Flex>
    </Header>
  )
}

export default HeaderMenu;