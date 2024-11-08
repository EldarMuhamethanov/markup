import React, { ReactNode, useRef, useState } from "react";
import { Menu, Button, Input, Modal, Dropdown } from "antd";
import {
  FileTextOutlined,
  FolderOutlined,
  PlusOutlined,
  SearchOutlined,
  FolderAddOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./DocumentsMenu.module.css";
import { observer } from "mobx-react-lite";
import { DocumentData } from "../../model/documents/DocumentsMenuModel";
import { documentsMenuModel } from "@/editorLayout/model/AppModel";
import { selectedDocumentData } from "@/editorLayout/model/AppModel";
import type { MenuProps } from "antd";

function DocumentContextMenu({ id, name }: Pick<DocumentData, "id" | "name">) {
  const renameModalValue = useRef<string>("");

  const contextMenuItems: MenuProps["items"] = [
    {
      label: "Переименовать",
      key: "rename",
      icon: <EditOutlined />,
    },
    {
      label: "Удалить",
      key: "remove",
      icon: <DeleteOutlined />,
    },
  ];

  const handleContextMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "rename": {
        Modal.confirm({
          title: "Переименовать",
          content: (
            <Input
              defaultValue={name}
              onChange={(e) => {
                renameModalValue.current = e.target.value;
              }}
            />
          ),
          onOk: () => {
            documentsMenuModel.renameDocument(id, renameModalValue.current);
          },
        });
        break;
      }
      case "remove": {
        Modal.confirm({
          title: "Удалить",
          content: `Вы уверены, что хотите удалить "${name}"?`,
          okText: "Удалить",
          okType: "danger",
          onOk: () => documentsMenuModel.removeDocument(id),
        });
      }
    }
  };

  const contextMenuProps = {
    items: contextMenuItems,
    onClick: handleContextMenuClick,
  };

  return (
    <Dropdown menu={contextMenuProps} trigger={["click"]}>
      <Button icon={<MoreOutlined />} size="middle" type="link" />
    </Dropdown>
  );
}

function DocumentLabel({ children }: { children: ReactNode }) {
  return (
    <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
      {children}
    </span>
  );
}

function filterDocuments(
  documents: DocumentData[],
  query: string
): DocumentData[] {
  return documents
    .map((doc) => {
      if (doc.type === "folder") {
        const filteredFiles = filterDocuments(doc.files, query);
        if (
          filteredFiles.length > 0 ||
          doc.name.toLowerCase().includes(query)
        ) {
          return { ...doc, files: filteredFiles };
        }
      } else if (doc.name.toLowerCase().includes(query)) {
        return doc;
      }
      return null;
    })
    .filter((doc) => doc !== null) as DocumentData[];
}

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
    const filteredDocuments = filterDocuments(
      documents,
      searchQuery.toLowerCase()
    );
    return filteredDocuments.map((doc) => {
      if (doc.type === "folder") {
        return {
          key: doc.id,
          label: <DocumentLabel>{doc.name}</DocumentLabel>,
          icon: <FolderOutlined />,
          children: renderDocumentItems(doc.files),
          onMouseDown: (e: MouseEvent) => {
            if (e.defaultPrevented) {
              return;
            }
            e.preventDefault();
            documentsMenuModel.selectDocument(doc.id);
          },
          extra: <DocumentContextMenu id={doc.id} name={doc.name} />,
        };
      }

      return {
        key: doc.id,
        label: <DocumentLabel>{doc.name}</DocumentLabel>,
        icon: <FileTextOutlined />,
        onMouseDown: (e: MouseEvent) => {
          e.preventDefault();
          documentsMenuModel.selectDocument(doc.id);
        },
        extra: <DocumentContextMenu id={doc.id} name={doc.name} />,
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
