import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { getItemAfterItem } from "../model/content/OrderedMap";
import { RichtextModifiers } from "./RichtextModifiers";

function onDelete(
  contentState: ContentStateData,
  selection: SelectionStateData
): ModifyRichtextFnResult {
  if (SelectionState.isCollapsed(selection)) {
    const paragraph = contentState.blockMap.blocks[selection.startKey];
    if (selection.startOffset === paragraph.text.length) {
      const nextParagraph = getItemAfterItem(contentState.blockMap, paragraph);
      if (!nextParagraph) {
        return {
          selection,
        };
      }
      return RichtextModifiers.delete(
        contentState,
        SelectionState.create({
          startKey: paragraph.key,
          startOffset: paragraph.text.length,
          endKey: nextParagraph.key,
          endOffset: 0,
        })
      );
    }
    return RichtextModifiers.delete(
      contentState,
      SelectionState.create({
        ...selection,
        endOffset: selection.endOffset + 1,
      })
    );
  }
  return RichtextModifiers.delete(contentState, selection);
}

export { onDelete };
