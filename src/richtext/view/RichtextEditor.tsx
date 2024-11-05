import React, { RefObject, useMemo, useRef } from "react";
import styles from "./RichtextEditor.module.css";
import { ContentStateData } from "../model/content/ContentState";
import { SelectionStateData } from "../model/selection/SelectionState";
import { useRichtextState } from "../common/hooks/useRichtextState";
import { setEditorSelection } from "../selection/setEditorSelection";
import { RichTextOperationHandler } from "../richtextOperation/RichTextOperationHandler";
import { useRichtextKeyboardHandlers } from "../common/hooks/useRichtextKeyboardHandlers";
import { getEditorSelection } from "../selection/getEditorSelection";
import { useRichTextUndoRedo } from "../common/hooks/useRichTextUndoRedo";
import { RichtextBlockRenderer } from "./RichtextBlockRenderer";
import { useClipboardEventsHandlers } from "../common/hooks/useClipboardEventsHandlers";
import { useRichtextKeyboardStylesHandlers } from "../common/hooks/useRichtextKeyboardStylesHandlers";
import { ToolbarPortal } from "@/editorLayout/view/toolbar/ToolbarPortal";

interface RichtextEditorProps {
  containerRef: RefObject<HTMLElement | null>;
  contentState: ContentStateData;
  setContentState: (contentState: ContentStateData) => void;
}

const RichtextEditor: React.FC<RichtextEditorProps> = ({
  containerRef,
  contentState,
  setContentState,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { modifyRichtextFn, undo, redo } = useRichtextState({
    contentState,
    setContentState,
    setEditorSelection: (selection: SelectionStateData | null) =>
      editorRef.current && setEditorSelection(editorRef.current, selection),
    getEditorSelection: () =>
      editorRef.current && getEditorSelection(editorRef.current),
  });

  const operationHandler = useMemo(
    () => new RichTextOperationHandler(modifyRichtextFn),
    [modifyRichtextFn]
  );

  useRichtextKeyboardHandlers(editorRef, operationHandler);
  useClipboardEventsHandlers(editorRef, operationHandler);
  useRichtextKeyboardStylesHandlers(editorRef, operationHandler);
  useRichTextUndoRedo(editorRef, undo, redo);

  return (
    <div
      className={styles.richtextEditor}
      contentEditable={true}
      suppressContentEditableWarning={true}
      ref={editorRef}
    >
      <RichtextBlockRenderer contentState={contentState} />
      <div className={styles.rowNumbersContainer}></div>
      <ToolbarPortal
        operationHandler={operationHandler}
        containerRef={containerRef}
      />
    </div>
  );
};

export { RichtextEditor };

export type { RichtextEditorProps };
