import { createContext, RefObject } from "react";

const PdfTargetContext = createContext<{
  targetRef: RefObject<HTMLDivElement | null>;
}>({
  targetRef: {
    current: null,
  },
});

export { PdfTargetContext };
