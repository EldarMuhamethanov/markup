import React from "react";
import { OrderedListGroup, UnorderedListGroup } from "../common/types";
import { ListItemView } from "./blocks/ListItemView";

const ListGroups: React.FC<OrderedListGroup | UnorderedListGroup> = (props) => {
  // Группируем элементы по уровням вложенности
  const renderNestedList = (blocks: typeof props.blocks, currentLevel: number = 0) => {
    const currentLevelBlocks = blocks.filter(block => block.level === currentLevel);
    
    if (currentLevelBlocks.length === 0) {
      return null;
    }

    const listItems = currentLevelBlocks.map((block, index) => {
      const nestedContent = renderNestedList(blocks, currentLevel + 1);
      
      return (
        <li key={`${index}`}>
          <ListItemView text={block.text} />
          {nestedContent}
        </li>
      );
    });

    if (props.type === "orderedList") {
      return <ol>{listItems}</ol>;
    }
    return <ul>{listItems}</ul>;
  };

  return renderNestedList(props.blocks);
};

export { ListGroups };
