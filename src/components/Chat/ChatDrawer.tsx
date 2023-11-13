import { useEffect, useState } from 'react';
import { Button, Drawer, Input, List, Avatar, Flex } from 'antd';
import { useAppSelector, useAppDispatch } from '../../store/storeHooks';
import { selectUsersList, selectMessage, addMessage } from '../../store/slices/authSlice';
import { ForkOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import { socket } from '../../http/socket';
import { BaseUser } from '../../@types/entities/BaseUser';
import { selectCurrentUser } from '../../store/slices/authSlice';
import { Message } from '../../@types/entities/Message';
type Props = {
  open: boolean;
  setOpen: (arg: boolean) => void;
}
const ChatDrawer = ({ open, setOpen }: Props) => {

  const dispatch = useAppDispatch();
  const usersList = useAppSelector(selectUsersList);
  const messages = useAppSelector(selectMessage);

  const currentUser = useAppSelector(selectCurrentUser);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [opponentId, setOpponentId] = useState<BaseUser>();
  const [message, setMessage] = useState("");
  const [dialog, setDialog] = useState<Message[] | undefined>();
  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = (opponent: any) => {
    setOpponentId(opponent)
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const sendMessage = () => {
    const msg = {
      opponentId: opponentId?.id,
      message: message,
      userId: currentUser?.id
    }
    socket.emit('message', msg)
    dispatch(addMessage(msg))
    setMessage("");
  }

  const getMessagesByOpponentId = (opponentId: number): Message[] => {
    return messages.filter((message) => message.opponentId === opponentId);
  };

  useEffect(() => {
    if (opponentId) {
      let messagesForOpponent = [];
      messagesForOpponent = getMessagesByOpponentId(opponentId?.id);
      setDialog(messagesForOpponent)
    }

  }, [opponentId, messages])

  return (
    <Drawer
      title="Мессенджер"
      placement="right"
      size='default'
      onClose={onClose}
      open={open}
    >
      <List
        dataSource={usersList}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
              }
              title={<a onClick={() => showChildrenDrawer(item)}>{item.email}</a>}
              description={item.role}
            />
          </List.Item>)}
      />
      <Drawer
        title={opponentId?.email}
        width={320}
        closable={false}
        onClose={onChildrenDrawerClose}
        open={childrenDrawer}
      >
        <Flex vertical style={{ height: '100%' }}>
          <Content style={{ flex: 1, overflowY: 'auto' }}>
            <List
              dataSource={dialog}
              renderItem={(item) => (
                <List.Item >
                  {item.message}
                </List.Item>
              )}
            />
          </Content>
          <Flex style={{ gap: 10, alignItems: 'flex-end', position: 'sticky', bottom: 0, backgroundColor: '#fff' }}>
            <Input placeholder="Введите сообщение" value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button type="primary" shape="circle" onClick={sendMessage} icon={<ForkOutlined />} />
          </Flex>
        </Flex>
      </Drawer>

    </Drawer>
  )
}

export default ChatDrawer