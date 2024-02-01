import React, { FC } from "react";
import styles from "./MarkdownEditorLayout.module.css";
import {
  RichtextEditor,
  RichtextEditorProps,
} from "../../../richtext/view/RichtextEditor";
import { ContentState } from "../../../richtext/model/content/ContentState";
import Markdown from "markdown-to-jsx";
import { EditorWrapper } from "./EditorWrapper";
import { EditorHeader } from "./EditorHeader";
import { observer } from "mobx-react-lite";
import { selectedDocumentData } from "../../model/AppModel";
import { EmptyLayout } from "./EmptyLayout";

const MarkdownEditorLayout: FC = observer(() => {
  const contentState = selectedDocumentData.contentState;
  const contentStateCopy = contentState && ContentState.copy(contentState);

  const _setContentState: RichtextEditorProps["setContentState"] = (
    newContentState
  ) => selectedDocumentData.setContentState(newContentState);

  return (
    <div className={styles.container}>
      {!contentStateCopy && <EmptyLayout />}
      {contentStateCopy && (
        <EditorWrapper
          header={<EditorHeader title={"Markdown"} />}
          content={
            <RichtextEditor
              contentState={contentStateCopy}
              setContentState={_setContentState}
            />
          }
        />
      )}
      {contentStateCopy && (
        <EditorWrapper
          header={<EditorHeader title={"Предпросмотр"} />}
          content={
            <Markdown>{ContentState.getText(contentStateCopy)}</Markdown>
          }
        />
      )}
    </div>
  );
});

export { MarkdownEditorLayout };
