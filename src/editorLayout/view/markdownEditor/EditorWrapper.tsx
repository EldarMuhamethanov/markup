import React, { ReactNode } from "react";
import styles from "./EditorWrapper.module.css";
import { EditorHeader } from "./EditorHeader";

interface EditorWrapperProps {
  header: string;
  content: ReactNode;
}

const EditorWrapper = ({ header, content }: EditorWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <EditorHeader title={header} />
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export { EditorWrapper };
