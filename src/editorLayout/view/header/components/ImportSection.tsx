import { Button, Dropdown, Space } from "antd";
import { DownOutlined, ImportOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { importItems } from "../constants/menuItems";
import { useImportHandlers } from "../../../hooks/useImportHandlers";
import styles from "../Header.module.css";

export const ImportSection: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const htmlInputRef = useRef<HTMLInputElement | null>(null);

  const { handleImportMenuClick, handleFileImport, handleHtmlImport } = useImportHandlers(
    inputRef,
    htmlInputRef
  );

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".md"
        aria-label="Импорт Markdown файла"
        style={{ display: "none" }}
        onChange={handleFileImport}
      />
      <input
        ref={htmlInputRef}
        type="file"
        accept=".html,.htm"
        aria-label="Импорт HTML файла"
        style={{ display: "none" }}
        onChange={handleHtmlImport}
      />

      <Dropdown
        menu={{ items: importItems, onClick: handleImportMenuClick }}
        trigger={["click"]}
      >
        <Button icon={<ImportOutlined />}>
          <Space>
            <span className={styles.buttonText}>Импорт</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </>
  );
}; 