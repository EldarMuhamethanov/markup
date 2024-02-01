import { RefObject, useEffect, useState } from "react";
import { verify } from "../verify";

function useResizeObserver(ref: RefObject<Element>) {
  const [size, updateSize] = useState(() => ({
    width: 0,
    height: 0,
  }));
  useEffect(() => {
    const element = verify(ref.current);
    const observer = new ResizeObserver(([entry]) => {
      updateSize(entry.contentRect);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [size.width, size.height];
}

export { useResizeObserver };
