import { Descriptions, DescriptionsProps } from "antd";

const Profile = () => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: 'Zhou Maomao',
    },
    {
      key: '2',
      label: 'Telephone',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Live',
      children: 'Hangzhou, Zhejiang',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
  ];

  return (
    <Descriptions title="Мой профиль" items={items} />
  )

}

export default Profile