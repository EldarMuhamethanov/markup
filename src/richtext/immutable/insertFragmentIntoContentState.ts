import { BlockMap, ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { getItemByIndex, getOrderedMapSize } from "../model/content/OrderedMap";

function insertFragmentIntoContentState(
  contentState: ContentStateData,
  selection: SelectionStateData,
  blockMap: BlockMap
): ModifyRichtextFnResult {
  if (blockMap.order.length === 1) {
    const selectedParagraph = contentState.blockMap.blocks[selection.startKey];
    const head = selectedParagraph.text.slice(0, selection.startOffset);
    const tail = selectedParagraph.text.slice(selection.endOffset);
    const insertedParagraph = blockMap.blocks[blockMap.order[0]];
    selectedParagraph.text = head + insertedParagraph.text + tail;
    return {
      selection: SelectionState.createCollapsed({
        startKey: selection.startKey,
        startOffset: selection.startOffset + insertedParagraph.text.length,
      }),
    };
  }
  const firstInsertedParagraph = getItemByIndex(blockMap, 0);
  const lastInsertedParagraph = getItemByIndex(
    blockMap,
    getOrderedMapSize(blockMap) - 1
  );

  if (!firstInsertedParagraph || !lastInsertedParagraph) {
    return { selection };
  }

  const selectedParagraph = contentState.blockMap.blocks[selection.startKey];
  const selectedParagraphIndex = contentState.blockMap.order.indexOf(
    selectedParagraph.key
  );
  const head = selectedParagraph.text.slice(0, selection.startOffset);
  const tail = selectedParagraph.text.slice(selection.endOffset);

  selectedParagraph.text = head + firstInsertedParagraph.text;
  lastInsertedParagraph.text = lastInsertedParagraph.text + tail;

  const insertedParagraphs = blockMap.order.slice(1, blockMap.order.length);

  contentState.blockMap.order.splice(
    selectedParagraphIndex + 1,
    0,
    ...insertedParagraphs
  );
  insertedParagraphs.forEach((paragraphKey) => {
    contentState.blockMap.blocks[paragraphKey] = blockMap.blocks[paragraphKey];
  });

  return {
    selection: SelectionState.createCollapsed({
      startKey: lastInsertedParagraph.key,
      startOffset: lastInsertedParagraph.text.length - tail.length,
    }),
  };
}

export { insertFragmentIntoContentState };
