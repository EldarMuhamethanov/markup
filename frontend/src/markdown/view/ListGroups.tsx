import React from "react";
import { OrderedListGroup, UnorderedListGroup } from "../common/types";
import { ListItemView } from "./blocks/ListItemView";

const ListGroups: React.FC<OrderedListGroup | UnorderedListGroup> = (props) => {
  const listContent = (
    <>
      {props.blocks.map((block, index) => (
        <ListItemView text={block.text} key={`${index}`} />
      ))}
    </>
  );

  if (props.type === "orderedList") {
    return <ol>{listContent}</ol>;
  }
  return <ul>{listContent}</ul>;
};

export { ListGroups };
