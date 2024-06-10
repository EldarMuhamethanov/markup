import { RefObject, useCallback, useRef } from "react";
import { useEventHandler } from "../../core/hooks/useEventHandler";

type KeyboardControllerHandlers = {
  code: string;
  withCtrl?: boolean;
  withShift?: boolean;
  handler?: (e: KeyboardEvent) => void;
}[];

function useKeyboardController(
  ref: RefObject<HTMLElement | null>,
  config: KeyboardControllerHandlers
) {
  const configRef = useRef(config);

  const _onKeydown = useCallback((e: Event) => {
    const keyboardEvent = e as KeyboardEvent;
    const withCtrl = keyboardEvent.ctrlKey;
    const withShift = keyboardEvent.shiftKey;
    const code = keyboardEvent.code;

    configRef.current.forEach((item) => {
      if (
        item.code === code &&
        !!item.withCtrl === withCtrl &&
        !!item.withShift === withShift
      ) {
        keyboardEvent.preventDefault();
        item.handler && item.handler(keyboardEvent);
      }
    });
  }, []);
  useEventHandler("keydown", ref, _onKeydown);
}

export { useKeyboardController };

export type { KeyboardControllerHandlers };
