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

const MarkdownEditorLayout: React.FC = observer(() => {
  const contentState = selectedDocumentData.contentState;
  const contentStateCopy = contentState && ContentState.copy(contentState);

  const _setContentState: RichtextEditorProps["setContentState"] = (
    newContentState
  ) => selectedDocumentData.setContentState(newContentState);

  return (
    <div className={styles.container}>
      {!contentStateCopy && <EmptyLayout />}
      {contentStateCopy && (
        <div className={styles.editorsContainer}>
          <div className={styles.editorSection}>
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
          <div className={styles.editorSection}>
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
