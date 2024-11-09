import React from "react";
import styles from "./EditorHeader.module.css";
import { Button } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

interface EditorHeaderProps {
  title: string;
  documentName?: string;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  documentName,
  isFullscreen,
  onFullscreenToggle,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{title}</span>
        {documentName && <span className={styles.documentName}>{documentName}</span>}
      </div>
      <Button
        type="default"
        icon={
          isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
        }
        onClick={onFullscreenToggle}
      />
    </div>
  );
};

export { EditorHeader };
