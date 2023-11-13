import { Key } from "react";
import { DataNode } from "../@types/entities/TreeDataNode";
import { Folder } from "../@types/entities/Folder";
import { File } from "../@types/entities/File";
// Функция для построения древовидной структуры на основе массива папок
const buildFolderTree = (folders: Folder[], parent_id?: number | null): DataNode[] => {
  const children: DataNode[] = folders
    .filter((folder) => (parent_id === undefined ? folder.parent_id === null : folder.parent_id === parent_id))
    .map((folder) => ({
      title: folder.name,
      key: `folder-${folder.id}`,
      isFile: false,
      children: buildFolderTree(folders, folder.id),
      id: folder.id
    }));

  return children;
};

// Функция для объединения файлов и папок в общую структуру
export const mergeFilesAndFolders = (files: File[], folders: Folder[]): DataNode[] => {

  const findFolderById = (id: number | null): Folder | undefined => {
    return folders.find(folder => folder.id === id);
  };

  // Помещает файлы в соответствующие папки
  const placeFilesInFolders = (files: File[], folders: Folder[]): DataNode[] => {
    const folderTree = buildFolderTree(folders);
    files.forEach(file => {
      const folder = findFolderById(file.folder_id);
      const fileNode: DataNode = {
        title: file.name,
        id: file.id,
        key: `file-${file.id}`,
        isLeaf: true,
        isFile: true,
        document_id: file.document_id,
        type: file.type
      };

      if (folder) {
        const parentFolderKey = `folder-${folder.id}`;
        const parentNode = findNode(folderTree, parentFolderKey);
        if (parentNode) {
          if (!parentNode.children) {
            parentNode.children = [];
          }
          parentNode.children.push(fileNode);
        }
      } else {
        // Если папка не найдена, добавляем файл в корень дерева
        folderTree.push(fileNode);
      }
    });
    return folderTree;
  };

  const folderTree = placeFilesInFolders(files, folders);
  return folderTree;
};



export function findParentNode(data: DataNode[], key: Key): DataNode | null {
  for (const node of data) {
    if (node.children) {
      const childNode = node.children.find(child => child.key === key);
      if (childNode) {
        return node;
      }
      const parent = findParentNode(node.children, key);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
}

const findNode = (data: DataNode[], key: string): DataNode | undefined => {
  for (const node of data) {
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

export const findNodeByKey = (data: DataNode[], key: Key): DataNode | null => {
  for (const node of data) {
    if (node.key === key) {
      return node;
    }
    if (node.children) {
      const childNode = findNodeByKey(node.children, key);
      if (childNode) {
        return childNode;
      }
    }
  }
  return null;
}

export function findElementsByKey(items: DataNode[], key: Key): DataNode[] {
  let foundElements: DataNode[] | undefined = [];
  function recursiveSearch(itemList: DataNode[]) {
    for (const item of itemList) {
      if (item.key === key) {
        foundElements = item.children;
        break;
      }
      if (item.children && item.children.length > 0) {
        recursiveSearch(item.children);
      }
    }
  }
  recursiveSearch(items);
  return foundElements;
}

export function findChildrenByParentKey(items: DataNode[], parentKey: Key): DataNode[] | undefined {
  for (const item of items) {
    if (item.key === parentKey) {
      return item.children;
    } else if (item.children && item.children.length > 0) {
      const result = findChildrenByParentKey(item.children, parentKey);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

export const dropTreeNode = (info: any, gData: DataNode[]) => {
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = info.node.pos.split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const loop = (
    data: DataNode[],
    key: React.Key,
    callback: (node: DataNode, i: number, data: DataNode[]) => void,
  ) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children!, key, callback);
      }
    }
  };
  const data = [...gData];

  // Find dragObject
  let dragObj: DataNode;
  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1);
    dragObj = item;
  });

  if (!info.dropToGap) {
    // Drop on the content
    loop(data, dropKey, (item) => {
      item.children = item.children || [];
      // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
      item.children.unshift(dragObj);
    });
  } else if (
    ((info.node as any).props.children || []).length > 0 && // Has children
    (info.node as any).props.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, (item) => {
      item.children = item.children || [];
      // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
      item.children.unshift(dragObj);
      // in previous version, we use item.children.push(dragObj) to insert the
      // item to the tail of the children
    });
  } else {
    let ar: DataNode[] = [];
    let i: number;
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i!, 0, dragObj!);
    } else {
      ar.splice(i! + 1, 0, dragObj!);
    }
  }
  return data
}