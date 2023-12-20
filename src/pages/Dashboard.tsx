import { Key, useEffect, useState } from "react";

import { Layout, Flex, Progress, Breadcrumb, Tree, Modal, Button, Result, Typography } from "antd";
import type { TreeProps, DirectoryTreeProps } from 'antd/es/tree';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { AdminSection, FranchisorSection } from "../components/Sidebar";
import WorkspaceCard from "../components/Workspace/Card/Card";
import { CreateDocumentModal } from "../components/Dashboard";

import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { selectCurrentRole, selectCurrentWorkspace } from "../store/slices/authSlice";
import { useAppSelector, useAppDispatch } from "../store/storeHooks";
import { DataNode } from "../@types/entities/TreeDataNode";
import { ROLE } from "../@types/entities/Role";
import { allowedRolesAdmin, allowedRolesFranchaisor } from "../constants/allowedRoles";

import { selectFolderList, setCurrentFolder } from "../store/slices/folderSlice";
import { selectFileList } from "../store/slices/fileSlice";
import { selectFavorite } from "../store/slices/favoriteSlice";

const { Content, Sider } = Layout;
const { DirectoryTree } = Tree;
const { Text } = Typography;
import { mergeFilesAndFolders, findNodeByKey, dropTreeNode, findElementsByKey } from "../helpers/tree";
import { generateBreadcrumb } from "../helpers/breadcrumb";
import { getLink } from "../helpers/getLink";

const Dashboard = () => {

  const dispatch = useAppDispatch();

  const fileData = useAppSelector(selectFileList) || [];
  const folderData = useAppSelector(selectFolderList) || [];
  const favorite = useAppSelector(selectFavorite) || [];
  const currentWorkspace = useAppSelector(selectCurrentWorkspace);
  const [isModalDocument, setIsModalDocument] = useState(false);
  const [isModalCreateDocument, setIsModalCreateDocument] = useState(false);
  const role = useAppSelector(selectCurrentRole) || ROLE.EMPLOYEE;
  const [gData, setGData] = useState(mergeFilesAndFolders(fileData, folderData));
  const [selectedCatalog, setSelectedCatalog] = useState<DataNode[]>(mergeFilesAndFolders(fileData, folderData));
  const [selectedKey, setSelectedKey] = useState<Key>("parent");
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItemType[]>([])
  const [linkDoc, setLinkDoc] = useState("");
  const [isEditable, setIsEditable] = useState(false)
  const [urlExit, setUrlExit] = useState("/pub?embedded=true")
console.log(favorite)
  const onDrop: TreeProps['onDrop'] = (info) => {
    setGData(dropTreeNode(info, gData));
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setIsEditable(e.target.checked)
  };

  useEffect(() => {
    isEditable ? setUrlExit("/pub?embedded=true") : setUrlExit("/edit")
    console.log('CHANCGE')
  }, [isEditable])

  useEffect(() => {
    setGData(mergeFilesAndFolders(fileData, folderData));
  }, [folderData, fileData])

  useEffect(() => {
    const result = findElementsByKey(gData, selectedKey);
    setSelectedCatalog(result);
  }, [gData])

  useEffect(() => {
    const selectedNode = findNodeByKey(gData, selectedKey);

    if (selectedNode?.isFile && selectedNode.type) {
      const baseURL = getLink(selectedNode.type);
      const URL = baseURL + selectedNode.document_id + urlExit;
      setLinkDoc(URL);
      setIsModalDocument(true);
      return
    }
    dispatch(setCurrentFolder(selectedNode))
    if (selectedKey === "parent") {
      setSelectedCatalog(gData);
      const data = generateBreadcrumb(gData);
      const breadcrumbItemsData: BreadcrumbItemType[] = [];
      data.map(item => {
        breadcrumbItemsData.push({ title: <a onClick={() => setSelectedKey(item.key)}>{item.title}</a> })
      })
      setBreadcrumbItems(breadcrumbItemsData)
    } else {
      const result = findElementsByKey(gData, selectedKey);
      setSelectedCatalog(result);
    }
    if (selectedNode) {
      const data = generateBreadcrumb(gData, selectedNode);
      const breadcrumbItemsData: BreadcrumbItemType[] = [];
      data.map(item => {
        breadcrumbItemsData.push({ title: <a onClick={() => setSelectedKey(item.key)}>{item.title}</a> })
      })
      setBreadcrumbItems(breadcrumbItemsData)
    }
  }, [selectedKey])

  const onSelect: DirectoryTreeProps['onSelect'] = (keys) => {
    const selectedKey = keys[0];
    setSelectedKey(selectedKey);
  };

  const ContentData = () => {
    return (
      <Flex vertical style={{ padding: 24, minHeight: 360, gap: 20 }}>
        <Flex justify="space-between" align="center">
          <Breadcrumb items={breadcrumbItems} />
          <Button onClick={() => setIsModalCreateDocument(true)}>Добавить файл или каталог</Button>
        </Flex>
        <Flex wrap="wrap" gap="small">
          {
            selectedCatalog?.map((item, index) => <WorkspaceCard key={index} item={item} index={index} onClick={setSelectedKey} />)
          }
        </Flex>
      </Flex>
    )
  }

  const DataStub = () => {
    return (
      <Result
        status="403"
        title="Выберите рабочее пространство"
        subTitle="Пока что нам нечего вам показать."
      />
    )
  }

  return (
    <>
      <Sider width={350} theme='light' style={{ padding: 20, margin: 20, borderRadius: 10 }}>
        <Flex vertical justify='space-between' style={{ minHeight: '100%' }}>
          <Flex vertical gap={20}>
            {allowedRolesAdmin.includes(role) && <AdminSection />}
            {allowedRolesFranchaisor.includes(role) && <FranchisorSection />}
            <DirectoryTree
              draggable
              onSelect={onSelect}
              onDrop={onDrop}
              treeData={gData}
              selectedKeys={[selectedKey]}
              selectable={true}
            />
            <Text>Избранное</Text>
            <DirectoryTree
              onSelect={onSelect}
              treeData={favorite}
              selectedKeys={[selectedKey]}
              selectable={true}
            />
          </Flex>
          <Flex vertical gap={10}>
            <Progress percent={66} />
            <p>Использовано 10 ГБ из 15 ГБ</p>
          </Flex>
        </Flex>
      </Sider>
      <Content style={{ padding: 20 }}>
        {currentWorkspace ? <ContentData /> : <DataStub />}
        <Modal open={isModalDocument} footer={null} onCancel={() => setIsModalDocument(false)} width={1200}>
          <iframe width={"100%"} height={600} frameBorder={0} src={linkDoc}></iframe>
        </Modal>
        <Modal footer={null} open={isModalCreateDocument} onCancel={() => setIsModalCreateDocument(false)} >
          <CreateDocumentModal />
        </Modal>
      </Content>
    </>
  )
}

export default Dashboard;