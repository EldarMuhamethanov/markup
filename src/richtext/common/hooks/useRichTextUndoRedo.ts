import { RefObject } from "react";
import { useEventHandler } from "../../../core/hooks/useEventHandler";

function useRichTextUndoRedo(
  editorRef: RefObject<HTMLDivElement | null>,
  undo: () => void,
  redo: () => void
) {
  useEventHandler("keydown", editorRef, (e: Event) => {
    const keyboardEvent = e as KeyboardEvent;
    if (keyboardEvent.ctrlKey) {
      if (keyboardEvent.code === "KeyZ") {
        keyboardEvent.preventDefault();
        undo();
      }
      if (keyboardEvent.code === "KeyY") {
        keyboardEvent.preventDefault();
        redo();
      }
    }
  });
}

export { useRichTextUndoRedo };
