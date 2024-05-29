import React, { useMemo, useRef } from "react";
import { QuoteGroup } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const QuoteView: React.FC<QuoteGroup> = (props) => {
  const ref = useRef<HTMLParagraphElement | null>(null);

  const contentText = useMemo(() => {
    return props.blocks.map((block) => block.text).join("</br>");
  }, [props.blocks]);

  useParseBlockContent(ref, contentText);

  return (
    <blockquote
      style={{
        margin: 0,
      }}
    >
      <p
        ref={ref}
        style={{
          fontStyle: "italic",
          padding: "10px 14px",
          borderLeft: "3px solid #a0aabf",
          margin: 0,
        }}
      ></p>
    </blockquote>
  );
};

export { QuoteView };
