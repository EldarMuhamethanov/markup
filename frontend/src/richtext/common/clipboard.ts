import { ContentStateData } from "../model/content/ContentState";
import { SelectionStateData } from "../model/selection/SelectionState";

function processCopy(
  contentState: ContentStateData,
  selection: SelectionStateData,
  event: ClipboardEvent
) {
  const startParagraphIndex = contentState.blockMap.order.indexOf(
    selection.startKey
  );
  const lastParagraphIndex = contentState.blockMap.order.indexOf(
    selection.endKey
  );

  const copiedParagraphs = contentState.blockMap.order.slice(
    startParagraphIndex,
    lastParagraphIndex + 1
  );
  let result = "";

  copiedParagraphs.forEach((paragraphKey) => {
    const paragraph = contentState.blockMap.blocks[paragraphKey];
    const start =
      paragraphKey === selection.startKey ? selection.startOffset : 0;
    const end =
      paragraphKey === selection.endKey
        ? selection.endOffset
        : paragraph.text.length;
    result += `${paragraph.text.slice(start, end)}\n`;
  });

  event.clipboardData && event.clipboardData.setData("text/plain", result);
}

export { processCopy };
