import React, { useState } from "react";
import { Menu, Button, Input, Modal } from "antd";
import {
  FileTextOutlined,
  FolderOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import styles from "./DocumentsMenu.module.css";
import { observer } from "mobx-react-lite";
import { DocumentData } from "../../model/documents/DocumentsMenuModel";
import { documentsMenuModel } from "@/editorLayout/model/AppModel";
import { selectedDocumentData } from "@/editorLayout/model/AppModel";
import type { MenuProps } from "antd";

export const DocumentsMenu: React.FC = observer(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [createItemType, setCreateItemType] = useState<"file" | "folder">(
    "file"
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const showCreateModal = (type: "file" | "folder") => {
    setCreateItemType(type);
    setNewItemName("");
    setIsCreateModalVisible(true);
  };

  const handleCreate = () => {
    if (newItemName.trim()) {
      documentsMenuModel.createDocument(createItemType, newItemName.trim());
      setIsCreateModalVisible(false);
    }
  };

  const renderDocumentItems = (
    documents: DocumentData[]
  ): MenuProps["items"] => {
    return documents
      .filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((doc) => {
        const contextMenu: MenuProps["items"] = [
          {
            key: "rename",
            icon: <EditOutlined />,
            label: "Переименовать",
            onClick: () => {
              Modal.confirm({
                title: "Переименовать",
                content: (
                  <Input
                    defaultValue={doc.name}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                ),
                onOk: () =>
                  documentsMenuModel.renameDocument(doc.id, newItemName),
              });
            },
          },
          {
            key: "delete",
            icon: <DeleteOutlined />,
            label: "Удалить",
            danger: true,
            onClick: () => {
              Modal.confirm({
                title: "Удалить",
                content: `Вы уверены, что хотите удалить "${doc.name}"?`,
                okText: "Удалить",
                okType: "danger",
                onOk: () => documentsMenuModel.removeDocument(doc.id),
              });
            },
          },
        ];

        if (doc.type === "folder") {
          return {
            key: doc.id,
            label: doc.name,
            icon: <FolderOutlined />,
            children: renderDocumentItems(doc.files),
            onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
            contextMenu,
          };
        }

        return {
          key: doc.id,
          label: doc.name,
          icon: <FileTextOutlined />,
          onClick: () => documentsMenuModel.selectDocument(doc.id),
          contextMenu,
        };
      });
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.searchWrapper}>
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Поиск документов"
          className={styles.search}
          value={searchQuery}
          onChange={handleSearch}
          allowClear
        />
      </div>

      <div className={styles.buttonGroup}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className={styles.actionButton}
          onClick={() => showCreateModal("file")}
        >
          Новый документ
        </Button>
        <Button
          icon={<FolderAddOutlined />}
          className={styles.actionButton}
          onClick={() => showCreateModal("folder")}
        >
          Новая папка
        </Button>
      </div>

      <Menu
        mode="inline"
        className={styles.menu}
        items={renderDocumentItems(documentsMenuModel.documents)}
        selectedKeys={[selectedDocumentData.selectedDocumentId || ""]}
        openKeys={documentsMenuModel.openedFolders}
        onOpenChange={(keys) =>
          documentsMenuModel.expandFolders(keys as string[])
        }
      />

      <Modal
        title={createItemType === "file" ? "Новый документ" : "Новая папка"}
        open={isCreateModalVisible}
        onOk={handleCreate}
        onCancel={() => setIsCreateModalVisible(false)}
      >
        <Input
          placeholder="Введите название"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          autoFocus
        />
      </Modal>
    </div>
  );
});
