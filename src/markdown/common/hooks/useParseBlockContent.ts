import { RefObject, useEffect } from "react";
import { getStyledRow } from "../getStyledRow";

const useParseBlockContent = (ref: RefObject<HTMLElement>, text: string) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!text) {
      ref.current.innerHTML = "&ZeroWidthSpace;";
      return;
    }

    ref.current.innerHTML = getStyledRow(text);
  }, [ref, text]);
};

export { useParseBlockContent };
