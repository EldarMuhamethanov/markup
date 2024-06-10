import { RefObject, useEffect } from "react";
import { getStyledRow } from "../getStyledRow";
import { escapeHTML } from "../../../core/html/escapeHTML";

const useParseBlockContent = (
  ref: RefObject<HTMLElement>,
  text: string,
  withImages = false
) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (!text) {
      ref.current.innerHTML = "&ZeroWidthSpace;";
      return;
    }

    ref.current.innerHTML = getStyledRow(escapeHTML(text), withImages);
  }, [ref, text, withImages]);
};

export { useParseBlockContent };
