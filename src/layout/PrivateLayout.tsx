import { Layout, FloatButton, Modal } from 'antd';
import { MessageOutlined, AppstoreOutlined } from '@ant-design/icons';
import HeaderMenu from '../components/Global/HeaderMenu';
import { useCurrentUserQuery } from '../api/auth';
import { selectCurrentRole, setCurrentFranchisor, selectCurrentFranchisor, selectCurrentWorkspace, selectCurrentPage, addMessage } from '../store/slices/authSlice';
import { allowedRolesAdmin } from '../constants/allowedRoles';
import { useAppSelector, useAppDispatch } from '../store/storeHooks';
import { ROLE } from '../@types/entities/Role';
import { useAllFranchaisorQuery } from '../api/franchaisor';
import { useAllFranchaiseeQuery } from '../api/franchaisee';
import { useAllWorkspaceMutation } from '../api/workspace';
import { useAllFoldersMutation } from '../api/folder';
import { useAllGroupsMutation } from '../api/group';
import { useAllFileMutation } from '../api/file';
import { useAllUsersQuery } from '../api/auth';
import { useEffect, useState } from 'react';
import ChatDrawer from '../components/Chat/ChatDrawer';
import ControlModal from '../components/Dashboard/ControlModal';

import { socket } from '../http/socket';

type Props = {
  children: React.ReactNode
}

const PrivateLayout = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [isModalControl, setIsModalControl] = useState(false);
  const [getWorkspace] = useAllWorkspaceMutation();
  const [getFolder] = useAllFoldersMutation();
  const [getFile] = useAllFileMutation();
  const [getGroup] = useAllGroupsMutation();

  const dispatch = useAppDispatch();
  //Загружаем данные о текущем пользователе
  const { data: me } = useCurrentUserQuery();
  useAllUsersQuery();

  //Получаем роль пользователя
  const role = useAppSelector(selectCurrentRole) || ROLE.EMPLOYEE;
  console.log(role)
  const currentFranchaisor = useAppSelector(selectCurrentFranchisor);
  const currentWorkspace = useAppSelector(selectCurrentWorkspace);
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    socket.emit('join', { "userId": me?.id });
    socket.on('message', function (data) {
      const msg = {
        opponentId: data.userId, 
        message: data.message,
        userId: data.opponentId
      }
      dispatch(addMessage(msg))
    })
  }, [])
  //Если админ, тогда загружаем всех франчайзеров и франчайзи
  if (allowedRolesAdmin.includes(role)) {
    useAllFranchaiseeQuery();
    useAllFranchaisorQuery();
  }

  //Если пользователь - франчайзер
  if (role === ROLE.FRANCHISOR) {
    dispatch(setCurrentFranchisor(me?.id))
  }

  useEffect(() => {
    currentFranchaisor && getWorkspace({ user_id: currentFranchaisor })
    currentFranchaisor && getGroup({ user_id: currentFranchaisor })
  }, [currentFranchaisor])

  useEffect(() => {
    currentWorkspace && getFolder({ spacework_id: currentWorkspace })
    currentWorkspace && getFile({ spacework_id: currentWorkspace })
  }, [currentWorkspace])

  return (
    <Layout style={{ minHeight: '100vh' }} >
      <HeaderMenu />
      <Layout>
        {children}
      </Layout>
      <FloatButton.Group shape="circle">
        <FloatButton onClick={() => setOpen(true)} badge={{ count: 12 }} icon={<MessageOutlined />} />
        {currentPage === 'db' && currentFranchaisor && <FloatButton onClick={() => setIsModalControl(true)} icon={<AppstoreOutlined />} />}
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
      <ChatDrawer open={open} setOpen={setOpen} />
      <Modal footer={null} open={isModalControl} onCancel={() => setIsModalControl(false)} >
        <ControlModal />
      </Modal>
    </Layout >
  )
}

export default PrivateLayout;