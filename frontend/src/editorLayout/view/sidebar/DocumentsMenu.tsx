import React from "react";
import { DocumentData } from "../../model/documents/DocumentsMenuModel";
import { observer } from "mobx-react-lite";
import { Button, ButtonProps, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  FileMarkdownOutlined,
  FolderAddOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import styles from "./DocumentsMenu.module.css";
import type { DataNode, TreeProps } from "antd/es/tree";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import {
  createFileModel,
  createFolderModel,
  documentsMenuModel,
  renameDocumentModel,
  selectedDocumentData,
} from "../../model/AppModel";

function remapDocumentToDataNode(documentData: DocumentData): DataNode {
  if (documentData.type === "file") {
    return {
      key: documentData.id,
      icon: <FileMarkdownOutlined />,
      title: documentData.name,
      isLeaf: true,
    };
  }
  return {
    key: documentData.id,
    icon: <FolderOutlined />,
    title: documentData.name,
    children: documentData.files.map(remapDocumentToDataNode),
  };
}

const DocumentsMenu = observer(() => {
  const remappedItems = documentsMenuModel.documents.map(
    remapDocumentToDataNode
  );
  const selectedKeys = selectedDocumentData.selectedDocumentId
    ? [selectedDocumentData.selectedDocumentId]
    : [];

  const onSelectItem: TreeProps["onSelect"] = (e) => {
    documentsMenuModel.selectDocument(e[0] as string);
  };

  const onExpandFolder: TreeProps["onExpand"] = (e) => {
    documentsMenuModel.expandFolders(e as string[]);
  };

  const actionsButtons: (ButtonProps & {
    tooltipTitle: string;
    key: string;
  })[] = [
    {
      key: "createFile",
      tooltipTitle: "Создать файл",
      icon: <FileAddOutlined />,
      onClick: () => createFileModel.openPopup(),
    },
    {
      key: "createFolder",
      tooltipTitle: "Создать папку",
      icon: <FolderAddOutlined />,
      onClick: () => createFolderModel.openPopup(),
    },
    {
      key: "renameDocument",
      tooltipTitle: "Переименовать",
      icon: <EditOutlined />,
      disabled: !selectedDocumentData.selectedDocumentId,
      onClick: () => {
        if (selectedDocumentData.selectedDocumentId) {
          renameDocumentModel.openPopup(
            selectedDocumentData.selectedDocumentId
          );
        }
      },
    },
    {
      key: "removeDocument",
      tooltipTitle: "Удалить",
      icon: <DeleteOutlined />,
      disabled: !selectedDocumentData.selectedDocumentId,
      onClick: () => {
        if (selectedDocumentData.selectedDocumentId) {
          documentsMenuModel.removeDocument(
            selectedDocumentData.selectedDocumentId
          );
        }
      },
    },
  ];

  return (
    <div className={styles.documentsMenuWrapper}>
      <Space className={styles.toolbar}>
        {actionsButtons.map((buttonData) => (
          <Tooltip
            key={buttonData.key}
            placement={"top"}
            title={buttonData.tooltipTitle}
          >
            <Button
              key={buttonData.key}
              icon={buttonData.icon}
              disabled={buttonData.disabled}
              onClick={buttonData.onClick}
            ></Button>
          </Tooltip>
        ))}
      </Space>
      <DirectoryTree
        treeData={remappedItems}
        onSelect={onSelectItem}
        onExpand={onExpandFolder}
        selectedKeys={selectedKeys}
        expandedKeys={documentsMenuModel.openedFolders}
      />
    </div>
  );
});

export { DocumentsMenu };
