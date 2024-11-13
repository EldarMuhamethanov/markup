import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";

const ZERO_WIDTH_SPACE_UNICODE = "\u200B";

function getParagraphBlock(
  editor: HTMLDivElement,
  node: Node
): HTMLElement | null {
  if (!node || editor === node) {
    return null;
  }
  if (node.nodeType === 1) {
    const element = node as HTMLElement;
    const key = element.getAttribute("data-key");
    if (key) {
      return element;
    }
  }
  return node.parentNode && getParagraphBlock(editor, node.parentNode);
}

function getStringLength(str: string): number {
  return [...str].length;
}

function utf16OffsetToCharOffset(text: string, utf16Offset: number): number {
  const substring = text.substring(0, utf16Offset);
  return [...substring].length;
}

function findKeyAndOffset(
  editor: HTMLDivElement,
  node: Node,
  offset: number
): { key: string; offset: number } | null {
  const paragraph = getParagraphBlock(editor, node);
  if (!paragraph) {
    return null;
  }
  const key = paragraph.getAttribute("data-key");
  if (!key) {
    return null;
  }
  let resultOffset = 0;
  let finded = false;

  const parseChildren = (children: Node) => {
    if (children.nodeType === 3) {
      if (children === node) {
        const text = children.textContent || '';
        resultOffset += utf16OffsetToCharOffset(text, offset);
        finded = true;
      } else {
        resultOffset += getStringLength(children.textContent || '');
      }
    } else {
      for (const child of children.childNodes) {
        if (finded) {
          break;
        }
        parseChildren(child);
      }
    }
  };

  for (const child of paragraph.children) {
    if (finded) {
      break;
    }
    parseChildren(child);
  }

  return {
    key,
    offset: resultOffset,
  };
}

function getEditorSelection(editor: HTMLDivElement): SelectionStateData | null {
  const windowSelection = window.getSelection();
  if (!windowSelection || windowSelection.rangeCount === 0) {
    return null;
  }
  const { startOffset, endOffset, startContainer, endContainer } =
    windowSelection.getRangeAt(0);

  if (!editor.contains(startContainer) || !editor.contains(endContainer)) {
    return null;
  }

  const startResult = findKeyAndOffset(editor, startContainer, startOffset);
  const endResult = findKeyAndOffset(editor, endContainer, endOffset);

  if (!startResult || !endResult) {
    return null;
  }

  const isEmptyNode =
    !startContainer.textContent ||
    startContainer.textContent.match(ZERO_WIDTH_SPACE_UNICODE);

  return SelectionState.create({
    startKey: startResult.key,
    endKey: endResult.key,
    startOffset: isEmptyNode ? 0 : startResult.offset,
    endOffset: isEmptyNode ? 0 : endResult.offset,
  });
}

export { getEditorSelection };
