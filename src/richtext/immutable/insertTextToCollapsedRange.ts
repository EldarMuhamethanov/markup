import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";

function insertTextToCollapsedRange(
  contentState: ContentStateData,
  selection: SelectionStateData,
  text: string
): ModifyRichtextFnResult {
  const paragraph = contentState.blockMap.blocks[selection.startKey];
  const head = paragraph.text.slice(0, selection.startOffset);
  const tail = paragraph.text.slice(selection.endOffset);

  const safeText = text || '';

  paragraph.text = head + safeText + tail;

  return {
    selection: SelectionState.createCollapsed({
      startKey: paragraph.key,
      startOffset: selection.startOffset + safeText.length,
    }),
  };
}

export { insertTextToCollapsedRange };
