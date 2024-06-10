import { SelectionStateData } from "../model/selection/SelectionState";

function getTextNodeAndOffset(
  editor: HTMLDivElement,
  key: string,
  offset: number
): { node: Node; offset: number } | null {
  const selector = `[data-key="${key}"]`;
  const paragraphBlock = editor.querySelector(selector);
  if (!paragraphBlock) {
    return null;
  }
  const paragraph = paragraphBlock.firstChild as Node;

  let resultOffset = 0;
  let charactersCount = 0;
  let resultNode: Node | null = null;

  const handleChild = (children: Node) => {
    if (children.nodeType === 3) {
      const currNodeCharsCount = children.textContent?.length || 0;
      if (charactersCount + currNodeCharsCount >= offset) {
        resultNode = children;
        resultOffset = offset - charactersCount;
      } else {
        charactersCount += currNodeCharsCount;
      }
    } else {
      for (const child of children.childNodes) {
        if (resultNode) {
          break;
        }
        handleChild(child);
      }
    }
  };

  for (const child of paragraph.childNodes) {
    if (resultNode) {
      break;
    }
    handleChild(child);
  }

  if (resultNode) {
    return {
      offset: resultOffset,
      node: resultNode,
    };
  }
  return null;
}

function setEditorSelection(
  editor: HTMLDivElement,
  selection: SelectionStateData | null
): void {
  const windowSelection = window.getSelection();
  if (!windowSelection) {
    return;
  }
  windowSelection.removeAllRanges();
  if (!selection) {
    return;
  }

  const startData = getTextNodeAndOffset(
    editor,
    selection.startKey,
    selection.startOffset
  );
  const endData = getTextNodeAndOffset(
    editor,
    selection.endKey,
    selection.endOffset
  );

  if (startData && endData) {
    const range = document.createRange();

    range.setStart(startData.node, startData.offset);
    range.setEnd(endData.node, endData.offset);

    windowSelection.addRange(range);
  }
}

export { setEditorSelection };
