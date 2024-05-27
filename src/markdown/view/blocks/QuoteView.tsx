import React, { useMemo, useRef } from "react";
import { QuoteGroup } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const QuoteView: React.FC<QuoteGroup> = (props) => {
  const ref = useRef<HTMLQuoteElement | null>(null);

  const contentText = useMemo(() => {
    return props.blocks.map((block) => block.text).join("</br>");
  }, [props.blocks]);

  useParseBlockContent(ref, contentText);

  return <blockquote ref={ref}></blockquote>;
};

export { QuoteView };
