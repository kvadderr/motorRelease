import { Form, Input, Button, Select, Space } from "antd"
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import { Group } from "../../@types/entities/Group";
import { selectGroupList, editGroup } from "../../store/slices/groupSlice";
import { useCreateGroupMutation } from "../../api/group";
import { useEffect, useState } from "react";


const EditGroupForm = () => {

  const [form] = Form.useForm();
  const [editGroupApi, { isLoading }] = useCreateGroupMutation();
  const [currentValue, setCurrentValue] = useState("");
  const groupList = useAppSelector(selectGroupList);
  const dispatch = useAppDispatch();

  const replaceGroupById = (id: number, updatedGroup: Group): Group[] => {
    return groupList?.map((group) =>
      group.id === id ? { ...group, ...updatedGroup } : group
    );
  };

  const groupData = groupList?.map((group) => ({ label: group.name, value: group.id }));

  const onchange = (value: string, option: any) => {
    form.setFieldsValue({
      name: option.label,
    });
  }

  const onFinish = async (values: any) => {
    const updatedGroupList = replaceGroupById(values.id, values);
    await editGroupApi(values).unwrap();
    dispatch(editGroup(updatedGroupList))
  };

  useEffect(() => {
    console.log(currentValue)
  }, [currentValue])

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        name="id"
        rules={[{ required: true, message: 'Пожалуйста выберете группу!' }]}
      >
        <Select
          placeholder="Выберите группу"
          options={groupData}
          onChange={onchange}
        />
      </Form.Item>
      <Form.Item
        name="name"
        initialValue={currentValue}
        rules={[{ required: true, message: 'Пожалуйста введите название группы!' }]}
      >
        <Input addonBefore="Название группы" value={currentValue} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Переименовать группу
          </Button>
          <Button disabled>Права доступа</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default EditGroupForm