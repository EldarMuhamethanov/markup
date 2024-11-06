import React from "react";
import {
  OrderedListGroup,
  UnorderedListGroup,
  UnorderedListItemBlock,
  OrderedListItemBlock,
} from "../common/types";
import { ListItemView } from "./blocks/ListItemView";

const ListGroups: React.FC<OrderedListGroup | UnorderedListGroup> = (props) => {
  const renderListItems = (
    items: (UnorderedListItemBlock | OrderedListItemBlock)[]
  ) => {
    return items.map((block, index) => {
      const hasChildren =
        "children" in block && block.children && block.children.length > 0;

      return (
        <li key={index}>
          <ListItemView text={block.text} />
          {hasChildren &&
            (props.type === "orderedList" ? (
              <ol>{renderListItems(block.children!)}</ol>
            ) : (
              <ul>{renderListItems(block.children!)}</ul>
            ))}
        </li>
      );
    });
  };

  return props.type === "orderedList" ? (
    <ol>{renderListItems(props.blocks)}</ol>
  ) : (
    <ul>{renderListItems(props.blocks)}</ul>
  );
};

export { ListGroups };
