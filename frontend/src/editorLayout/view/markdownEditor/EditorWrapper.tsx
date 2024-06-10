import React, { ReactNode, RefObject, useRef } from "react";
import styles from "./EditorWrapper.module.css";
import { EditorHeader } from "./EditorHeader";

interface EditorWrapperProps {
  header: string;
  getContent: (wrapperRef: RefObject<HTMLDivElement | null>) => ReactNode;
}

const EditorWrapper = ({ header, getContent }: EditorWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.header}>
        <EditorHeader title={header} />
      </div>
      <div className={styles.content}>{getContent(wrapperRef)}</div>
    </div>
  );
};

export { EditorWrapper };
