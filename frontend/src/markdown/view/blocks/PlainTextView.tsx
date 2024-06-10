import React, { useRef } from "react";
import { PlainTextBlock } from "src/markdown/common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const PlainTextView: React.FC<PlainTextBlock> = (props) => {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useParseBlockContent(ref, props.text, true);

  return <p ref={ref}>{props.text}</p>;
};

export { PlainTextView };
