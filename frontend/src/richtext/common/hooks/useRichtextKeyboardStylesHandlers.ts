import { RefObject, useMemo } from "react";
import { RichTextOperationHandler } from "../../richtextOperation/RichTextOperationHandler";
import {
  KeyboardControllerHandlers,
  useKeyboardController,
} from "../../controllers/KeyboardController";

function useRichtextKeyboardStylesHandlers(
  ref: RefObject<HTMLElement | null>,
  operationHandler: RichTextOperationHandler
) {
  const config: KeyboardControllerHandlers = useMemo(
    () => [
      {
        code: "KeyB",
        withCtrl: true,
        handler: () => operationHandler.toggleInlineStyle("bold"),
      },
      {
        code: "KeyI",
        withCtrl: true,
        handler: () => operationHandler.toggleInlineStyle("italic"),
      },
      {
        code: "KeyS",
        withCtrl: true,
        handler: () => operationHandler.toggleInlineStyle("strikethrow"),
      },
      {
        code: "Comma",
        withCtrl: true,
        handler: () => operationHandler.toggleInlineStyle("subscript"),
      },
      {
        code: "Period",
        withCtrl: true,
        handler: () => operationHandler.toggleInlineStyle("superscript"),
      },
    ],
    [operationHandler]
  );

  useKeyboardController(ref, config);
}

export { useRichtextKeyboardStylesHandlers };
