import React from "react";
import styles from "./EditorWrapper.module.css";

interface EditorWrapperProps {
  header: JSX.Element;
  content: JSX.Element;
}

const EditorWrapper = ({ header, content }: EditorWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export { EditorWrapper };
