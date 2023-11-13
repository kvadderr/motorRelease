import { Form, Input, Button } from "antd"
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import { selectCurrentWorkspace } from "../../store/slices/authSlice";
import { addFolder, selectCurrentFolder } from "../../store/slices/folderSlice";
import { useCreateFolderMutation } from "../../api/folder";

const CreateFolderForm = () => {

    const [createFolder] = useCreateFolderMutation();
    const dispatch = useAppDispatch();
    const currentWorkspace = useAppSelector(selectCurrentWorkspace);
    const currentFolder = useAppSelector(selectCurrentFolder);
    
    const onFinish = async (values: any) => {
        values.spacework_id = currentWorkspace;
        if (currentFolder) values.parent_id = currentFolder.id;
        const data = await createFolder(values).unwrap();
        console.log('kvad;', data)
        dispatch(addFolder(data)) 
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input name folder!' }]}
            >
                <Input addonBefore="Folder name" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Создать каталог
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateFolderForm