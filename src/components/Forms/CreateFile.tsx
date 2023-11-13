import { Radio, Form, Input, Button } from "antd"
import { useAppSelector, useAppDispatch } from "../../store/storeHooks";

import { useCreateFileMutation } from "../../api/file";
import { selectCurrentWorkspace } from "../../store/slices/authSlice";
import { selectCurrentFolder } from "../../store/slices/folderSlice";
import { addFile } from "../../store/slices/fileSlice";

const CreateFileForm = () => {

  const [createFile, { isLoading }] = useCreateFileMutation();
  const dispatch = useAppDispatch();
  const currentWorkspace = useAppSelector(selectCurrentWorkspace);
  const currentFolder = useAppSelector(selectCurrentFolder);

  const onFinish = async (values: any) => {
    values.spacework_id = currentWorkspace;
    if (currentFolder) values.folder_id = currentFolder.id;
    const data = await createFile(values).unwrap();
    dispatch(addFile(data))
  };


  return (
    <Form
      name="fileForm"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input name folder!' }]}>
        <Input addonBefore="Название файла" />
      </Form.Item>
      <Form.Item
        name="type"
        initialValue="document"
        rules={[{ required: true, message: 'Please input name folder!' }]}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="document">Документ</Radio.Button>
          <Radio.Button value="presentation">Презентация</Radio.Button>
          <Radio.Button value="spreadsheet">Таблица</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Создать файл
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateFileForm