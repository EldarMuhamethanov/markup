import React from "react";
import { DefaultGroup } from "../common/types";
import { HeaderView } from "./blocks/Header";
import { PlainTextView } from "./blocks/PlainTextView";

const DefaultGroups: React.FC<DefaultGroup> = (group) => {
  const block = group.blocks[0];

  if (block.type === "header") {
    return <HeaderView {...block} />;
  }
  if (block.type === "plainText") {
    return <PlainTextView {...block} />;
  }
  return null;
};

export { DefaultGroups };
