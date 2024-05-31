import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";

type SwitchParagraphType =
  | "quote"
  | "ordered-list-item"
  | "unordered-list-item"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5";

const prefixes = new Map([
  ["quote", "> "],
  ["unordered-list-item", "- "],
  ["h1", "# "],
  ["h2", "## "],
  ["h3", "### "],
  ["h4", "#### "],
  ["h5", "##### "],
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

  allSelectedBlocksKeys.forEach((blockKey) => {
    const block = contentState.blockMap.blocks[blockKey];
    block.text = `${prefix} ${block.text}`;
  });

  return {
    selection: SelectionState.create({
      ...selection,
      startOffset: selection.startOffset + (prefix?.length || 0),
      endOffset: selection.endOffset + (prefix?.length || 0),
    }),
  };
};

export { switchParagraphType };

export type { SwitchParagraphType };
