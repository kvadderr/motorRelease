import { DataNode } from "../@types/entities/TreeDataNode";
import { findParentNode } from "./tree";
import { HomeOutlined } from '@ant-design/icons';

export const generateBreadcrumb = (gData: DataNode[], selectedNode?: DataNode) => {
  const titles = [];

  if (selectedNode) {
    // Добавляем title выбранного узла
    if (selectedNode?.title) {
      titles.push({ title: selectedNode.title.toString(), key: selectedNode.key });
    }
    // Поиск и добавление title родительского узла (если есть)
    let parentNode = findParentNode(gData, selectedNode.key);

    while (parentNode) {
      if (parentNode.title) {
        titles.push({ title: parentNode.title.toString(), key: parentNode.key });
      }
      parentNode = findParentNode(gData, parentNode.key);
    }
  }

  const firstElement = {
    title: <HomeOutlined />,
    key: 'parent'
  }

  return [firstElement, ...titles.reverse()]
}