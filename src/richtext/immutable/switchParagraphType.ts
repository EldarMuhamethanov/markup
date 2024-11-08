import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";

export type SwitchParagraphType =
  | "quote"
  | "unordered-list-item"
  | "ordered-list-item"
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "heading-four"
  | "heading-five"
  | "heading-six"
  | "code-block";

const prefixes = new Map([
  ["quote", "> "],
  ["unordered-list-item", "- "],
  ["heading-one", "# "],
  ["heading-two", "## "],
  ["heading-three", "### "],
  ["heading-four", "#### "],
  ["heading-five", "##### "],
  ["heading-six", "###### "],
]);

const switchParagraphType = (
  contentState: ContentStateData,
  selection: SelectionStateData,
  paragraphType: SwitchParagraphType
): ModifyRichtextFnResult => {
  const allSelectedBlocksKeys = contentState.blockMap.order.slice(
    contentState.blockMap.order.indexOf(selection.startKey),
    contentState.blockMap.order.indexOf(selection.endKey) + 1
  );

  const prefix = prefixes.get(paragraphType);
  let offsetDiff = 0;

  const firstBlock = contentState.blockMap.blocks[allSelectedBlocksKeys[0]];
  const isCodeBlock = firstBlock.text.startsWith("```");

  if (paragraphType === "code-block") {
    if (isCodeBlock) {
      allSelectedBlocksKeys.forEach((blockKey, index) => {
        const block = contentState.blockMap.blocks[blockKey];
        if (index === 0 || index === allSelectedBlocksKeys.length - 1) {
          if (block.text === "```") {
            block.text = "";
          }
        }
      });
      offsetDiff = -3;
    } else {
      const firstBlock = contentState.blockMap.blocks[allSelectedBlocksKeys[0]];
      const lastBlock = contentState.blockMap.blocks[allSelectedBlocksKeys[allSelectedBlocksKeys.length - 1]];
      
      firstBlock.text = "```\n" + firstBlock.text;
      lastBlock.text = lastBlock.text + "\n```";
      offsetDiff = 4;
    }
  } else {
    allSelectedBlocksKeys.forEach((blockKey, index) => {
      const block = contentState.blockMap.blocks[blockKey];

      if (paragraphType === "ordered-list-item") {
        const numberedListRegex = /^\d+\.\s/;
        if (numberedListRegex.test(block.text)) {
          block.text = block.text.replace(numberedListRegex, "");
          offsetDiff = -3;
        } else {
          block.text = `${index + 1}. ${block.text}`;
          offsetDiff = 3;
        }
      } else if (prefix && block.text.startsWith(prefix)) {
        block.text = block.text.substring(prefix.length).trimLeft();
        offsetDiff = -(prefix.length + 1);
      } else {
        block.text = `${prefix} ${block.text}`;
        offsetDiff = prefix?.length ? prefix.length + 1 : 0;
      }
    });
  }

  return {
    selection: SelectionState.create({
      ...selection,
      startOffset: Math.max(0, selection.startOffset + offsetDiff),
      endOffset: Math.max(0, selection.endOffset + offsetDiff),
    }),
  };
};

export { switchParagraphType };
