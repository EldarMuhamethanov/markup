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
          <div
            className={styles.editorSection}
            style={{ width: `${editorLayoutModel.leftPaneWidth}%` }}
          >
            <EditorWrapper
              header={"Markdown"}
              getContent={(wrapperRef) => (
                <RichtextEditor
                  containerRef={wrapperRef}
                  contentState={contentStateCopy}
                  setContentState={_setContentState}
                />
              )}
            />
          </div>
          <Resizer />
          <div
            className={styles.editorSection}
            style={{ width: `${100 - editorLayoutModel.leftPaneWidth}%` }}
          >
            <EditorWrapper
              header={"Предпросмотр"}
              getContent={() => (
                <Markdown text={ContentState.getText(contentStateCopy)} />
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export { MarkdownEditorLayout };
