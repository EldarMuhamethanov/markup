import React, { useMemo, useRef } from "react";
import { QuoteGroup } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const QuoteView: React.FC<QuoteGroup> = (props) => {
  const ref = useRef<HTMLParagraphElement | null>(null);

  const contentText = useMemo(() => {
    return props.blocks.map((block) => block.text).join("\n");
  }, [props.blocks]);

  useParseBlockContent(ref, contentText);

  return (
    <blockquote>
      <p ref={ref}></p>
    </blockquote>
  );
};

export { QuoteView };
