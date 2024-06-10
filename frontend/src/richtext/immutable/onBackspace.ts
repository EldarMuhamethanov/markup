import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { RichtextModifiers } from "./RichtextModifiers";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { getItemBeforeItem } from "../model/content/OrderedMap";

function onBackspace(
  contentState: ContentStateData,
  selection: SelectionStateData
): ModifyRichtextFnResult {
  if (SelectionState.isCollapsed(selection)) {
    const paragraph = contentState.blockMap.blocks[selection.startKey];
    if (selection.startOffset === 0) {
      const prevParagraph = getItemBeforeItem(contentState.blockMap, paragraph);
      if (!prevParagraph) {
        return {
          selection,
        };
      }
      return RichtextModifiers.delete(
        contentState,
        SelectionState.create({
          startKey: prevParagraph.key,
          startOffset: prevParagraph.text.length,
          endKey: paragraph.key,
          endOffset: 0,
        })
      );
    }
    return RichtextModifiers.delete(
      contentState,
      SelectionState.create({
        ...selection,
        startOffset: selection.startOffset - 1,
      })
    );
  }
  return RichtextModifiers.delete(contentState, selection);
}

export { onBackspace };
