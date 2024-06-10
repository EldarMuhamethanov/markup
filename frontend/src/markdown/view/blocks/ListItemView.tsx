import React, { useRef } from "react";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const ListItemView: React.FC<{ text: string }> = (props) => {
  const ref = useRef<HTMLLIElement | null>(null);
  useParseBlockContent(ref, props.text);

  return <li ref={ref}>{props.text}</li>;
};

export { ListItemView };
