import React from "react";
import styles from "./EditorHeader.module.css";

interface EditorHeaderProps {
  title: string;
}

const EditorHeader = ({ title }: EditorHeaderProps) => {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export { EditorHeader };
