import { RefObject, useMemo } from "react";
import { useEventHandler } from "../../../core/hooks/useEventHandler";
import { RichTextOperationHandler } from "../../richtextOperation/RichTextOperationHandler";
import {
  KeyboardControllerHandlers,
  useKeyboardController,
} from "../../controllers/KeyboardController";

const checkPrintableKeys = [
  {
    code: "KeyZ",
    withCtrl: true,
  },
  {
    code: "KeyY",
    withCtrl: true,
  },
  {
    code: "KeyB",
    withCtrl: true,
  },
  {
    code: "KeyI",
    withCtrl: true,
  },
  {
    code: "KeyS",
    withCtrl: true,
  },
  {
    code: "KeyU",
    withCtrl: true,
  },
  {
    code: "KeyA",
    withCtrl: true,
  },
  {
    code: "KeyC",
    withCtrl: true,
  },
  {
    code: "KeyX",
    withCtrl: true,
  },
  {
    code: "KeyV",
    withCtrl: true,
  },
  {
    code: "KeyR",
    withCtrl: true,
  },
];

function isPrintableKey(e: KeyboardEvent) {
  return (
    e.key.length === 1 &&
    !checkPrintableKeys.some(({ code, withCtrl }) => {
      return (
        code === e.code && (withCtrl === e.ctrlKey || withCtrl === e.metaKey)
      );
    })
  );
}

function useRichtextKeyboardHandlers(
  ref: RefObject<HTMLElement | null>,
  operationHandler: RichTextOperationHandler
) {
  const config: KeyboardControllerHandlers = useMemo(
    () => [
      {
        code: "Enter",
        handler: () => operationHandler.onEnter(),
      },
      {
        code: "Backspace",
        handler: () => operationHandler.onBackspace(),
      },
      {
        code: "Delete",
        handler: () => operationHandler.onDelete(),
      },
      {
        code: "KeyA",
        handler: () => operationHandler.onSelectAll(),
        withCtrl: true,
      },
    ],
    [operationHandler]
  );

  useKeyboardController(ref, config);
  useEventHandler("keydown", ref, (e) => {
    const keyboardEvent = e as KeyboardEvent;
    const data = keyboardEvent.key;
    if (isPrintableKey(keyboardEvent)) {
      e.preventDefault();
      operationHandler.onTextInput(data);
    }
  });
}

export { useRichtextKeyboardHandlers };
