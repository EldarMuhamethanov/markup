"use client";

import React from "react";
import styles from "./MarkdownEditorLayout.module.css";
import {
  RichtextEditor,
  RichtextEditorProps,
} from "../../../richtext/view/RichtextEditor";
import { ContentState } from "../../../richtext/model/content/ContentState";
import { EditorWrapper } from "./EditorWrapper";
import { observer } from "mobx-react-lite";
import {
  editorLayoutModel,
  selectedDocumentData,
  documentsMenuModel,
} from "../../model/AppModel";
import { EmptyLayout } from "./EmptyLayout";
import { Markdown } from "../../../markdown/view/Markdown";
import { useMarkdownDragAndDrop } from "../../hooks/useMarkdownDragAndDrop";
import { useResizer } from "../../hooks/useResizer";
import { useHtmlElementEventHandler } from "@/core/hooks/useHtmlElementEventHandler";

const MarkdownEditorLayout: React.FC = observer(() => {
  const contentState = selectedDocumentData.contentState;
  const contentStateCopy = contentState && ContentState.copy(contentState);

  const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
    useMarkdownDragAndDrop(documentsMenuModel);

  const { Resizer } = useResizer({
    containerClassName: styles.editorsContainer,
    onWidthChange: (width) => editorLayoutModel.setLeftPaneWidth(width),
  });

  const _setContentState: RichtextEditorProps["setContentState"] = (
    newContentState
  ) => selectedDocumentData.setContentState(newContentState);

  useHtmlElementEventHandler(
    "resize",
    typeof window !== "undefined" ? window : null,
    () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        editorLayoutModel.setLeftPaneWidth(100);
      } else {
        editorLayoutModel.setLeftPaneWidth(50); // или другое значение по умолчанию
      }
    }
  );

  const handleLeftPaneFullscreen = () => {
    editorLayoutModel.setFullscreenPane(
      editorLayoutModel.fullscreenPane === "left" ? null : "left"
    );
  };

  const handleRightPaneFullscreen = () => {
    editorLayoutModel.setFullscreenPane(
      editorLayoutModel.fullscreenPane === "right" ? null : "right"
    );
  };

  return (
    <div
      className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!contentStateCopy && <EmptyLayout />}
      {contentStateCopy && (
        <div className={styles.editorsContainer}>
          {editorLayoutModel.fullscreenPane !== "right" && (
            <div
              className={`${styles.editorSection} ${
                editorLayoutModel.fullscreenPane === "left"
                  ? styles.fullscreen
                  : ""
              }`}
              style={{
                width:
                  editorLayoutModel.fullscreenPane === "left"
                    ? "100%"
                    : `${editorLayoutModel.leftPaneWidth}%`,
              }}
            >
              <EditorWrapper
                header={"Редактор"}
                documentName={selectedDocumentData.fileName || undefined}
                isFullscreen={editorLayoutModel.fullscreenPane === "left"}
                onFullscreenToggle={handleLeftPaneFullscreen}
                getContent={(wrapperRef) => (
                  <RichtextEditor
                    containerRef={wrapperRef}
                    contentState={contentStateCopy}
                    setContentState={_setContentState}
                  />
                )}
              />
            </div>
          )}
          {!editorLayoutModel.fullscreenPane && <Resizer />}
          {editorLayoutModel.fullscreenPane !== "left" && (
            <div
              className={styles.editorSection}
              style={{
                width:
                  editorLayoutModel.fullscreenPane === "right"
                    ? "100%"
                    : `${100 - editorLayoutModel.leftPaneWidth}%`,
              }}
            >
              <EditorWrapper
                header={"Предпросмотр"}
                documentName={selectedDocumentData.fileName || undefined}
                isFullscreen={editorLayoutModel.fullscreenPane === "right"}
                onFullscreenToggle={handleRightPaneFullscreen}
                getContent={() => (
                  <Markdown text={ContentState.getText(contentStateCopy)} />
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export { MarkdownEditorLayout };
