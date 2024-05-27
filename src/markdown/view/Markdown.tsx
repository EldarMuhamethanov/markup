import React, { useCallback, useMemo } from "react";
import { groupBlocks } from "../common/groupBlocks";
import { getRowParser } from "../common/parseRow";
import { BlockData, GroupBlockData } from "../common/types";
import { DefaultGroups } from "./DefaultGroups";
import { CodeBlockView } from "./blocks/CodeBlockView";
import { ListGroups } from "./ListGroups";
import { QuoteView } from "./blocks/QuoteView";
import { TableView } from "./blocks/TableView";

type MarkdownProps = {
  text: string;
};

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  const getGroups = useCallback(() => {
    const parser = getRowParser();
    return groupBlocks(
      text.split("\n").map(parser).filter(Boolean) as BlockData[]
    );
  }, [text]);

  return (
    <div>
      {getGroups().map((group, index) => {
        const key = `${group.type}_${index}`;
        switch (group.type) {
          case "default":
            return <DefaultGroups {...group} key={key} />;
          case "code":
            return <CodeBlockView {...group} key={key} />;
          case "orderedList":
          case "unorderedList":
            return <ListGroups {...group} key={key} />;
          case "quote":
            return <QuoteView {...group} key={key} />;
          case "table":
            return <TableView {...group} key={key} />;
        }
      })}
    </div>
  );
};

export { Markdown };
