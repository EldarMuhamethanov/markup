import React from "react";
import styles from "./MarkdownEditorLayout.module.css";
import {
  RichtextEditor,
  RichtextEditorProps,
} from "../../../richtext/view/RichtextEditor";
import { ContentState } from "../../../richtext/model/content/ContentState";
import { EditorWrapper } from "./EditorWrapper";
import { observer } from "mobx-react-lite";
import { selectedDocumentData } from "../../model/AppModel";
import { EmptyLayout } from "./EmptyLayout";
import { Markdown } from "../../../markdown/view/Markdown";
import { useCallback, useState } from "react";

const MarkdownEditorLayout: React.FC = observer(() => {
  const contentState = selectedDocumentData.contentState;
  const contentStateCopy = contentState && ContentState.copy(contentState);
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(50);

  const handleResize = useCallback((e: MouseEvent) => {
    const container = document.querySelector(`.${styles.editorsContainer}`);
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    const clampedWidth = Math.min(Math.max(newWidth, 20), 80);
    setLeftPaneWidth(clampedWidth);
  }, []);

  const startResize = useCallback(() => {
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  }, [handleResize]);

  const stopResize = useCallback(() => {
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  }, [handleResize]);

  const _setContentState: RichtextEditorProps["setContentState"] = (
    newContentState
  ) => selectedDocumentData.setContentState(newContentState);

  return (
    <div className={styles.container}>
      {!contentStateCopy && <EmptyLayout />}
      {contentStateCopy && (
        <div className={styles.editorsContainer}>
          <div 
            className={styles.editorSection} 
            style={{ width: `${leftPaneWidth}%` }}
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
          <div 
            className={styles.resizer} 
            onMouseDown={startResize}
          />
          <div 
            className={styles.editorSection}
            style={{ width: `${100 - leftPaneWidth}%` }}
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
