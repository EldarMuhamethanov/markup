import React from "react";
import styles from "./EditorHeader.module.css";
import { Button } from "antd";
import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";

interface EditorHeaderProps {
  title: string;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  title,
  isFullscreen,
  onFullscreenToggle,
}) => {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
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
