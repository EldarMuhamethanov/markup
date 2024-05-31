import { ContentStateData } from "../model/content/ContentState";
import {
  SelectionState,
  SelectionStateData,
} from "../model/selection/SelectionState";
import { ToggleInlineStyles } from "../model/InlineStyles";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { stringSplice } from "../../core/string/string";

const styleToWrapperMap: Map<ToggleInlineStyles, string> = new Map([
  ["bold", "**"],
  ["italic", "*"],
  ["strikethrow", "~~"],
  ["subscript", "~"],
  ["superscript", "^"],
  ["highlight", "=="],
  ["inlineCode", "`"],
]);

function toggleInlineStyle(
  contentState: ContentStateData,
  selection: SelectionStateData,
  style: ToggleInlineStyles
): ModifyRichtextFnResult {
  const firstSelectedParagraph =
    contentState.blockMap.blocks[selection.startKey];
  const lastSelectedParagraph = contentState.blockMap.blocks[selection.endKey];

  const wrapper = styleToWrapperMap.get(style) as string;
  const beforeStr = firstSelectedParagraph.text.slice(0, selection.startOffset);
  const afterStr = lastSelectedParagraph.text.slice(selection.endOffset);

  if (beforeStr.endsWith(wrapper) && afterStr.startsWith(wrapper)) {
    lastSelectedParagraph.text = stringSplice(
      lastSelectedParagraph.text,
      selection.endOffset,
      wrapper.length
    );
    firstSelectedParagraph.text = stringSplice(
      firstSelectedParagraph.text,
      selection.startOffset - wrapper.length,
      wrapper.length
    );
    const newStartOffset = selection.startOffset - wrapper.length;
    const newEndOffset =
      firstSelectedParagraph === lastSelectedParagraph
        ? selection.endOffset - wrapper.length
        : selection.endOffset;
    return {
      selection: SelectionState.create({
        ...selection,
        startOffset: newStartOffset,
        endOffset: newEndOffset,
      }),
    };
  } else {
    lastSelectedParagraph.text = stringSplice(
      lastSelectedParagraph.text,
      selection.endOffset,
      0,
      wrapper
    );
    firstSelectedParagraph.text = stringSplice(
      firstSelectedParagraph.text,
      selection.startOffset,
      0,
      wrapper
    );
    const newStartOffset = selection.startOffset + wrapper.length;
    const newEndOffset =
      firstSelectedParagraph === lastSelectedParagraph
        ? selection.endOffset + wrapper.length
        : selection.endOffset;
    return {
      selection: SelectionState.create({
        ...selection,
        startOffset: newStartOffset,
        endOffset: newEndOffset,
      }),
    };
  }
}

export { toggleInlineStyle };
