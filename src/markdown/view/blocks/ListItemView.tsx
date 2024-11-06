import React, { useRef } from "react";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const ListItemView: React.FC<{ text: string }> = (props) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  useParseBlockContent(ref, props.text);

  return <span ref={ref}>{props.text}</span>;
};

export { ListItemView };
