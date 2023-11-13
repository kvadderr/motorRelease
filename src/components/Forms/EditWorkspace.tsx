import { Form, Input, Button, Select } from "antd"
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import { Group } from "../../@types/entities/Group";
import { selectWorkspaceList, editWorkspace } from "../../store/slices/workspaceSlice";
import { useCreateWorkspaceMutation } from "../../api/workspace";
import { useEffect, useState } from "react";


const EditWorkspaceForm = () => {

  const [form] = Form.useForm();
  const [EditWorkspaceApi, { isLoading }] = useCreateWorkspaceMutation();
  const [currentValue, setCurrentValue] = useState("");
  const workspaceList = useAppSelector(selectWorkspaceList);
  const dispatch = useAppDispatch();

  const replaceGroupById = (id: number, updatedGroup: Group): Group[] => {
    return workspaceList?.map((workspace) =>
      workspace.id === id ? { ...workspace, ...updatedGroup } : workspace
    );
  };

  const groupData = workspaceList?.map((workspace) => ({ label: workspace.name, value: workspace.id }));

  const onchange = (value: string, option: any) => {
    form.setFieldsValue({
      name: option.label,
    });
  }

  const onFinish = async (values: any) => {
    const updatedGroupList = replaceGroupById(values.id, values);
    await EditWorkspaceApi(values).unwrap();
    dispatch(editWorkspace(updatedGroupList))
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
        rules={[{ required: true, message: 'Пожалуйста выберете пространство!' }]}
      >
        <Select
          placeholder="Выберите пространство"
          options={groupData}
          onChange={onchange}
        />
      </Form.Item>
      <Form.Item
        name="name"
        initialValue={currentValue}
        rules={[{ required: true, message: 'Пожалуйста введите название пространства!' }]}
      >
        <Input addonBefore="Название пространства" value={currentValue} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Переименовать пространство
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditWorkspaceForm