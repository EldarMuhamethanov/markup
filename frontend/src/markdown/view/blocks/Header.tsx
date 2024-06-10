import React, { useRef } from "react";
import { HeaderBlock } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

const HeaderView: React.FC<HeaderBlock> = (props) => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useParseBlockContent(ref, props.text);

  if (props.order === 1) {
    return <h1 ref={ref}>{props.text}</h1>;
  }
  if (props.order === 2) {
    return <h2 ref={ref}>{props.text}</h2>;
  }
  if (props.order === 3) {
    return <h3 ref={ref}>{props.text}</h3>;
  }
  if (props.order === 4) {
    return <h4 ref={ref}>{props.text}</h4>;
  }
  if (props.order === 5) {
    return <h5 ref={ref}>{props.text}</h5>;
  }
  return null;
};

export { HeaderView };
