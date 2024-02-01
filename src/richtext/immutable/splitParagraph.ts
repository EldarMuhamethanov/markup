import { ContentStateData } from "../model/content/ContentState";
import { Paragraph } from "../model/content/ParagraphData";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { insertItemAtIndex } from "../model/content/OrderedMap";

function splitParagraph(
  contentState: ContentStateData,
  selection: SelectionStateData
): ModifyRichtextFnResult {
  const paragraph = contentState.blockMap.blocks[selection.startKey];
  const paragraphIndex = contentState.blockMap.order.indexOf(paragraph.key);
  const head = paragraph.text.slice(0, selection.startOffset);
  const tail = paragraph.text.slice(selection.endOffset);

  paragraph.text = head;

  const newParagraph = Paragraph.create({
    text: tail,
  });
  insertItemAtIndex(contentState.blockMap, newParagraph, paragraphIndex + 1);

  return {
    selection: SelectionState.createCollapsed({
      startKey: newParagraph.key,
      startOffset: 0,
    }),
  };
}

export { splitParagraph };
