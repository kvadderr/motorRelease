import { Form, Input, Button } from "antd"
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";
import { addGroup } from "../../store/slices/groupSlice";
import { useCreateGroupMutation } from "../../api/group";
import { selectCurrentFranchisor } from "../../store/slices/authSlice";

const CreateGroupForm = () => {

    const [createGroup, {isLoading}] = useCreateGroupMutation();
    const currentFranchaisor = useAppSelector(selectCurrentFranchisor);
    const dispatch = useAppDispatch();
    
    console.log('currentFranchaisor', currentFranchaisor)

    const onFinish = async (values: any) => {
        values.user_id = currentFranchaisor;
        const data = await createGroup(values).unwrap();
        dispatch(addGroup(data)) 
    };

    return (
        <Form
            name="createGroup"
            layout="vertical"
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Пожалуйста введите название группы!' }]}
            >
                <Input addonBefore="Название группы" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Создать группу
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateGroupForm