import React, { RefObject, useCallback, useContext } from "react";
import { groupBlocks } from "../common/groupBlocks";
import { getRowParser } from "../common/parseRow";
import { BlockData, FootnoteDefinitionBlock } from "../common/types";
import { DefaultGroups } from "./DefaultGroups";
import { CodeBlockView } from "./blocks/CodeBlockView";
import { ListGroups } from "./ListGroups";
import { QuoteView } from "./blocks/QuoteView";
import { TableView } from "./blocks/TableView";
import { PdfTargetContext } from "../../editorLayout/view/padConvertation/PdfTargetContext";
import "./Markdown.css";
import { FootnotesView } from "./blocks/FootnotesView";

type MarkdownProps = {
  text: string;
};

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  const { targetRef } = useContext(PdfTargetContext);

  const getGroups = useCallback(() => {
    const parser = getRowParser();
    const blocks = text.split("\n").map(parser).filter(Boolean) as BlockData[];

    // Собираем сноски
    const footnotes = blocks.filter(
      (block): block is FootnoteDefinitionBlock =>
        block.type === "footnoteDefinition"
    );

    // Удаляем блоки сносок из основного контента
    const contentBlocks = blocks.filter(
      (block) => block.type !== "footnoteDefinition"
    );

    return {
      groups: groupBlocks(contentBlocks),
      footnotes,
    };
  }, [text]);

  const { groups, footnotes } = getGroups();

  return (
    <div ref={targetRef as RefObject<HTMLDivElement>} className="markdown">
      {groups.map((group, index) => {
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
      <FootnotesView footnotes={footnotes} />
    </div>
  );
};

export { Markdown };
