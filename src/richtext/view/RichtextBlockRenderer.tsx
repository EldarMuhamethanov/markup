import React from "react";
import { ContentStateData } from "../model/content/ContentState";
import { getParagraphType } from "./paragraphBlock/getParagraphType";
import { ParagraphBlock } from "./paragraphBlock/ParagraphBlock";

interface RichtextBlockRendererProps {
  contentState: ContentStateData;
}

function renderBlocks(contentState: ContentStateData) {
  let codeBlockOpened = false;

  return contentState.blockMap.order.map((key) => {
    const paragraph = contentState.blockMap.blocks[key];
    let paragraphType = getParagraphType(paragraph.text);
    if (
      codeBlockOpened &&
      paragraphType !== "code-block-close" &&
      paragraphType !== "code-block-open"
    ) {
      paragraphType = "code-block-open";
    }
    if (paragraphType === "code-block-open") {
      codeBlockOpened = true;
    }
    if (paragraphType === "code-block-close") {
      codeBlockOpened = false;
    }
    return (
      <ParagraphBlock
        key={key}
        paragraph={paragraph}
        paragraphType={paragraphType}
      />
    );
  });
}

const RichtextBlockRenderer = ({
  contentState,
}: RichtextBlockRendererProps) => {
  return <>{renderBlocks(contentState)}</>;
};

export { RichtextBlockRenderer };
