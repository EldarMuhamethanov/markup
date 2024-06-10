import { BlockMap, ContentStateData } from "../model/content/ContentState";
import { SelectionStateData } from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { removeRangeFromContentState } from "./removeRangeFromContentState";
import { insertTextToCollapsedRange } from "./insertTextToCollapsedRange";
import { splitParagraph } from "./splitParagraph";
import { insertFragmentIntoContentState } from "./insertFragmentIntoContentState";

const RichtextModifiers = {
  textInput(
    contentState: ContentStateData,
    selection: SelectionStateData,
    text: string
  ): ModifyRichtextFnResult {
    const { selection: newSelection } = removeRangeFromContentState(
      contentState,
      selection
    );
    return insertTextToCollapsedRange(contentState, newSelection, text);
  },

  delete(contentState: ContentStateData, selection: SelectionStateData) {
    return removeRangeFromContentState(contentState, selection);
  },

  split(contentState: ContentStateData, selection: SelectionStateData) {
    const { selection: newSelection } = removeRangeFromContentState(
      contentState,
      selection
    );
    return splitParagraph(contentState, newSelection);
  },

  insertFragment(
    contentState: ContentStateData,
    selection: SelectionStateData,
    blockMap: BlockMap
  ) {
    const { selection: newSelection } = removeRangeFromContentState(
      contentState,
      selection
    );
    return insertFragmentIntoContentState(contentState, newSelection, blockMap);
  },
};

export { RichtextModifiers };
