import { RefObject, useMemo } from "react";
import { useEventHandler } from "../../../core/hooks/useEventHandler";
import { RichTextOperationHandler } from "../../richtextOperation/RichTextOperationHandler";
import {
  KeyboardControllerHandlers,
  useKeyboardController,
} from "../../controllers/KeyboardController";

const checkPrintableKeys = [
  {
    key: "z",
    withCtrl: true,
  },
  {
    key: "z",
    withCtrl: true,
  },
  {
    key: "y",
    withCtrl: true,
  },
  {
    key: "b",
    withCtrl: true,
  },
  {
    key: "i",
    withCtrl: true,
  },
  {
    key: "s",
    withCtrl: true,
  },
  {
    key: "u",
    withCtrl: true,
  },
  {
    key: "a",
    withCtrl: true,
  },
  {
    key: "c",
    withCtrl: true,
  },
  {
    key: "v",
    withCtrl: true,
  },
  {
    key: "r",
    withCtrl: true,
  },
];

function isPrintableKey(e: KeyboardEvent) {
  return (
    e.key.length === 1 &&
    !checkPrintableKeys.some(({ key, withCtrl }) => {
      return key === e.key.toLowerCase() && withCtrl === e.ctrlKey;
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
