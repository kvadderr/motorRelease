import { Card, Flex, Space, Button, Image } from "antd"
import { FolderOutlined, EllipsisOutlined } from '@ant-design/icons';
import { DataNode } from "../../../@types/entities/TreeDataNode";
import doc from "../../../assets/doc.png"

type Props = {
    index: number;
    item: DataNode;
    onClick: (arg: string) => void;
}

const WorkspaceCard = ({ index, item, onClick }: Props) => {

    const handleClick = () => {
        onClick(item.key);
    };

    return (
        <Card style={{ minWidth: 350, cursor: "pointer" }} key={index} onClick={handleClick}>
            <Flex justify="space-between">
                <Space size='middle'>
                    {item.isFile ? <Image width={18} src={doc} /> : <FolderOutlined />}
                    {item.title?.toString()}
                </Space>
                <Button icon={<EllipsisOutlined />} size='small' />
            </Flex>
        </Card>
    )
}

export default WorkspaceCard