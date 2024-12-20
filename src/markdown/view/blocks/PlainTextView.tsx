import React, { useRef } from "react";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";
import {PlainTextBlock} from "@/markdown/common/types";

const PlainTextView: React.FC<PlainTextBlock> = (props) => {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useParseBlockContent(ref, props.text, true);

  return <p ref={ref}>{props.text}</p>;
};

export { PlainTextView };
