import React from "react";
import { QuoteGroup } from "../../common/types";
import { Markdown } from "../Markdown";

const QuoteView: React.FC<QuoteGroup> = (props) => {
  return (
    <blockquote>
      <Markdown text={props.blocks.map((block) => block.text).join("\n")} />
    </blockquote>
  );
};

export { QuoteView };
