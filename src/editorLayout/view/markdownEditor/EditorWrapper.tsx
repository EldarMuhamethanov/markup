import React, { ReactNode, RefObject, useRef } from "react";
import styles from "./EditorWrapper.module.css";
import { EditorHeader } from "./EditorHeader";

interface EditorWrapperProps {
  header: string;
  getContent: (wrapperRef: RefObject<HTMLDivElement | null>) => ReactNode;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
}

const EditorWrapper = ({
  header,
  getContent,
  isFullscreen,
  onFullscreenToggle,
}: EditorWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.headerContainer}>
        <EditorHeader
          title={header}
          isFullscreen={isFullscreen}
          onFullscreenToggle={onFullscreenToggle}
        />
        <div className={styles.headerDivider} />
      </div>
      <div className={styles.contentContainer}>{getContent(wrapperRef)}</div>
    </div>
  );
};

export { EditorWrapper };
