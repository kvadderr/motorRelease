import { TabsProps, Result } from 'antd';
import { CreateFolderForm, CreateFileForm } from '../components/Forms';

export const contentType: TabsProps['items'] = [
  {
    key: '1',
    label: 'Добавить каталог',
    children: <CreateFolderForm />,
  },
  {
    key: '2',
    label: 'Добавить файл',
    children: <CreateFileForm />
  },
  {
    key: '3',
    label: 'Загрузить файл',
    children: <Result
      status="404"
      title="404"
      subTitle="К сожалению данный функционал временно ограничен"
    />
  },
]