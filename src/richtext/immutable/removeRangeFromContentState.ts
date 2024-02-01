import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { removeItemFromOrderedMap } from "../model/content/OrderedMap";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";

function removeRangeFromContentState(
  contentState: ContentStateData,
  selection: SelectionStateData
): ModifyRichtextFnResult {
  if (SelectionState.isCollapsed(selection)) {
    return {
      selection,
    };
  }

  if (selection.startKey === selection.endKey) {
    const paragraphBlock = contentState.blockMap.blocks[selection.startKey];
    const head = paragraphBlock.text.slice(0, selection.startOffset);
    const tail = paragraphBlock.text.slice(selection.endOffset);
    paragraphBlock.text = head + tail;

    return {
      selection: SelectionState.createCollapsed({
        startKey: paragraphBlock.key,
        startOffset: selection.startOffset,
      }),
    };
  }
  const firstParagraph = contentState.blockMap.blocks[selection.startKey];
  const lastParagraph = contentState.blockMap.blocks[selection.endKey];

  const firstParagraphIndex = contentState.blockMap.order.indexOf(
    firstParagraph.key
  );
  const lastParagraphIndex = contentState.blockMap.order.indexOf(
    lastParagraph.key
  );

  const blockKeysForRemove = contentState.blockMap.order.slice(
    firstParagraphIndex + 1,
    lastParagraphIndex + 1
  );
  blockKeysForRemove.forEach((blockKey) => {
    removeItemFromOrderedMap(
      contentState.blockMap,
      contentState.blockMap.blocks[blockKey]
    );
  });

  const head = firstParagraph.text.slice(0, selection.startOffset);
  const tail = lastParagraph.text.slice(selection.endOffset);
  firstParagraph.text = head + tail;

  return {
    selection: SelectionState.createCollapsed({
      startKey: firstParagraph.key,
      startOffset: selection.startOffset,
    }),
  };
}

export { removeRangeFromContentState };
