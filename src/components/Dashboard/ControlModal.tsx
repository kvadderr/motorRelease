import { Tabs } from 'antd';
import { contentType } from '../../constants/controlData';

const ControlModal = () => {
    return (
        <Tabs
            defaultActiveKey="1"
            centered
            items={contentType}
        />
    )
}

export default ControlModal