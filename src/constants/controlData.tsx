import { TabsProps } from 'antd';
import { Group, Workspace } from '../components/Settings';

export const contentType: TabsProps['items'] = [
  {
    key: '1',
    label: 'Группы',
    children: <Group />,
  },
  {
    key: '2',
    label: 'Рабочие пространства',
    children: <Workspace />
  },
]