import React, { ElementType, useRef } from "react";
import { HeaderBlock } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";
import { getValueByCheckedKey } from "@/core/getValueByCheckedKey";

const HeaderView: React.FC<HeaderBlock> = (props) => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useParseBlockContent(ref, props.text);

  const Comp: ElementType = getValueByCheckedKey(props.order, {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  });
  return <Comp ref={ref}>{props.text}</Comp>;
};

export { HeaderView };
