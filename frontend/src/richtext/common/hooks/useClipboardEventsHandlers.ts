import { RefObject } from "react";
import { RichTextOperationHandler } from "../../richtextOperation/RichTextOperationHandler";
import { useEventHandler } from "../../../core/hooks/useEventHandler";

function useClipboardEventsHandlers(
  ref: RefObject<HTMLElement | null>,
  operationHandler: RichTextOperationHandler
) {
  useEventHandler("paste", ref, (e: Event) => {
    const clipboardEvent = e as ClipboardEvent;
    clipboardEvent.preventDefault();
    operationHandler.onPaste(clipboardEvent);
  });
  useEventHandler("copy", ref, (e: Event) => {
    const clipboardEvent = e as ClipboardEvent;
    clipboardEvent.preventDefault();
    operationHandler.onCopy(clipboardEvent);
  });
  useEventHandler("cut", ref, (e: Event) => {
    const clipboardEvent = e as ClipboardEvent;
    clipboardEvent.preventDefault();
    operationHandler.onCut(clipboardEvent);
  });
}

export { useClipboardEventsHandlers };
