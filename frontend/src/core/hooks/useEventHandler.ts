import { RefObject, useEffect } from "react";
import { useLatestRef } from "./useLatestRef";

function useEventHandler(
  eventType: string,
  ref: RefObject<HTMLElement | null>,
  handler: (e: Event) => void
) {
  const handlerRef = useLatestRef<(e: Event) => void>(handler);

  useEffect(() => {
    const currentHandler = handlerRef.current;
    const elements = ref && ref.current;
    if (currentHandler && elements) {
      elements.addEventListener(eventType, handler);
      return () => {
        elements.removeEventListener(eventType, handler);
      };
    }
  });
}

export { useEventHandler };
