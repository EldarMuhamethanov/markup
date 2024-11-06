import React from "react";
import { DefaultGroup } from "../common/types";
import { HeaderView } from "./blocks/Header";
import { PlainTextView } from "./blocks/PlainTextView";
import { HorizontalRuleView } from "./blocks/HorizontalRuleView";

const DefaultGroups: React.FC<DefaultGroup> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            return <HeaderView key={index} {...block} />;
          case "plainText":
            return <PlainTextView key={index} {...block} />;
          case "horizontalRule":
            return <HorizontalRuleView key={index} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export { DefaultGroups };
