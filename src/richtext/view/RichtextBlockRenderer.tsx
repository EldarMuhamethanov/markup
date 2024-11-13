import React from "react";
import { ContentStateData } from "../model/content/ContentState";
import { getParagraphType } from "./paragraphBlock/getParagraphType";
import { ParagraphBlock } from "./paragraphBlock/ParagraphBlock";

interface RichtextBlockRendererProps {
  contentState: ContentStateData;
}

function renderBlocks(contentState: ContentStateData) {
  let codeBlockOpened = false;

  return contentState.blockMap.order.map((key, index) => {
    const paragraph = contentState.blockMap.blocks[key];
    let paragraphType = getParagraphType(paragraph.text);
    
    if (
      codeBlockOpened &&
      paragraphType !== "code-block-bracket"
    ) {
      paragraphType = "code-block";
    } else if (paragraphType === "code-block-bracket" && !codeBlockOpened) {
      codeBlockOpened = true;
    } else if (paragraphType === "code-block-bracket" && codeBlockOpened) {
      codeBlockOpened = false;
    }
    return (
      <ParagraphBlock
        key={key}
        index={index}
        paragraph={paragraph}
        paragraphType={paragraphType}
      />
    );
  });
}

const RichtextBlockRenderer: React.FC<RichtextBlockRendererProps> = ({
  contentState,
}) => {
  return <>{renderBlocks(contentState)}</>;
};

export { RichtextBlockRenderer };
