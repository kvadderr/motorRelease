import { Tabs } from 'antd';
import { contentType } from '../../constants/FileAndFolder';

const CreateDocumentModal = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={contentType}
    />
  )
}

export default CreateDocumentModal