import { Form, Input, Button } from "antd"
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";
import { addWorkspace } from "../../store/slices/workspaceSlice";
import { useCreateWorkspaceMutation } from "../../api/workspace";
import { selectCurrentFranchisor } from "../../store/slices/authSlice";

const CreateWorkspaceForm = () => {

    const [createWorkspace, {isLoading}] = useCreateWorkspaceMutation();
    const currentFranchaisor = useAppSelector(selectCurrentFranchisor);
    const dispatch = useAppDispatch();
    
    const onFinish = async (values: any) => {
        values.user_id = currentFranchaisor;
        const data = await createWorkspace(values).unwrap();
        dispatch(addWorkspace(data)) 
    };

    return (
        <Form
            name="createWorkspace"
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Пожалуйста введите название пространства!' }]}
            >
                <Input addonBefore="Название пространства" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Создать рабочее пространство
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateWorkspaceForm