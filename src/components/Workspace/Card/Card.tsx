import { useState } from "react";
import { Card, Flex, Space, Button, Image, Dropdown, Form, Input, Modal } from "antd"
import { FolderOutlined, EllipsisOutlined } from '@ant-design/icons';
import { DataNode } from "../../../@types/entities/TreeDataNode";
import type { MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from "../../../store/storeHooks";
import { changeFolderName } from "../../../store/slices/folderSlice";
import { addFavorite } from "../../../store/slices/favoriteSlice";
import { changeFileName } from "../../../store/slices/fileSlice";
import doc from "../../../assets/doc.png"
import { selectCurrentRole } from "../../../store/slices/authSlice";
import { allowedRolesFranchaisor } from "../../../constants/allowedRoles";
import { ROLE } from "../../../@types/entities/Role";




type Props = {
    index: number;
    item: DataNode;
    onClick: (arg: string) => void;
}


const WorkspaceCard = ({ index, item, onClick }: Props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newData, setNewData] = useState('');
    const role = useAppSelector(selectCurrentRole) || ROLE.EMPLOYEE;
    console.log(role)
    const dispatch = useAppDispatch();
    const handleClick = () => {
        onClick(item.key);
    };

    const items: MenuProps['items'] = [
        {
            label: "Удалить",
            key: '0',
        },
        {
            label: "Переименовать",
            key: '1',
        },
        {
            label: "Права доступа",
            disabled: true,
            key: '2',
        },
        {
            label: "Избранное",
            key: '3',
        },
    ];

    const userItems: MenuProps['items'] = [
        {
            label: "Избранное",
            key: '3',
        },
    ];

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        switch (e.key) {
            case "1":
                setIsModalOpen(true)
                break;
            case "3":
                dispatch(addFavorite(item))
                break;
            default:
                break;
        }
        console.log(e);


    };

    const menuProps = {
        items: allowedRolesFranchaisor.includes(role) ? items : userItems,
        onClick: handleMenuClick,
    };

    const onFinish = () => {
        const data = {
            id: item.id,
            newName: newData
        }
        if (!item.isFile) {
            dispatch(changeFolderName(data))
        } else {
            dispatch(changeFileName(data))
        }
    };

    return (
        <Card style={{ minWidth: 350, cursor: "pointer" }} key={index}>
            <Flex justify="space-between">
                <Space size='middle' onClick={handleClick}>
                    {item.isFile ? <Image width={18} src={doc} /> : <FolderOutlined />}
                    {item.title?.toString()}
                </Space>
                <Dropdown menu={menuProps}>
                    <Button icon={<EllipsisOutlined />} size="small" />
                </Dropdown>
            </Flex>
            <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)} >
                <Space>
                    <Input value={newData} onChange={(e) => setNewData(e.target.value)} addonBefore="Новое название" />
                    <Button type="primary" htmlType="submit" onClick={onFinish}>
                        Сохранить
                    </Button>
                </Space>
            </Modal>
        </Card>
    )
}

export default WorkspaceCard