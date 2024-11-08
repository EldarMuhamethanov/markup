import { useEffect } from "react";
import { useLatestRef } from "./useLatestRef";

function useHtmlElementEventHandler(
  eventType: string,
  element: HTMLElement | Document | Window | null,
  handler: (e: Event) => void
) {
  const handlerRef = useLatestRef<(e: Event) => void>(handler);

  useEffect(() => {
    const currentHandler = handlerRef.current;
    if (currentHandler) {
      element?.addEventListener(eventType, currentHandler);
      return () => {
        element?.removeEventListener(eventType, currentHandler);
      };
    }
  });
}

export { useHtmlElementEventHandler };
