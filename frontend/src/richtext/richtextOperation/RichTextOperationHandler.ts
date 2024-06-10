import { ModifyRichtextFn } from "./ModifyRichtextFn";
import { onEnter } from "../immutable/onEnter";
import { RichtextModifiers } from "../immutable/RichtextModifiers";
import { onBackspace } from "../immutable/onBackspace";
import { onDelete } from "../immutable/onDelete";
import { Paragraph } from "../model/content/ParagraphData";
import { createOrderedMapFromValues } from "../model/content/OrderedMap";
import { ToggleInlineStyles } from "../model/InlineStyles";
import { toggleInlineStyle } from "../immutable/toggleInlineStyle";
import { processCopy } from "../common/clipboard";
import { SelectionState } from "../model/selection/SelectionState";
import { ContentState } from "../model/content/ContentState";
import { ParagraphType } from "../view/paragraphBlock/getParagraphType";
import {
  switchParagraphType,
  SwitchParagraphType,
} from "../immutable/switchParagraphType";

class RichTextOperationHandler {
  private readonly _modifyFn: (mofidyFn: ModifyRichtextFn) => void;

  constructor(modifyRichtextFn: (mofidyFn: ModifyRichtextFn) => void) {
    this._modifyFn = modifyRichtextFn;
  }

  onSelectAll() {
    this._modifyFn((contentState, selection) => {
      const lastBlock = ContentState.getLastBlock(contentState);
      const firstBlock = ContentState.getFirstBlock(contentState);
      if (!lastBlock || !firstBlock) {
        return {
          selection,
        };
      }
      return {
        selection: SelectionState.create({
          startKey: firstBlock.key,
          endKey: lastBlock.key,
          startOffset: 0,
          endOffset: lastBlock.text.length,
        }),
      };
    });
  }

  onEnter() {
    this._modifyFn((contentState, selection) => {
      return onEnter(contentState, selection);
    });
  }

  onTextInput(data: string) {
    this._modifyFn((contentState, selection) => {
      return RichtextModifiers.textInput(contentState, selection, data);
    });
  }

  onBackspace() {
    this._modifyFn((contentState, selection) => {
      return onBackspace(contentState, selection);
    });
  }

  onDelete() {
    this._modifyFn((contentState, selection) => {
      return onDelete(contentState, selection);
    });
  }

  onPaste(e: ClipboardEvent) {
    const plainText = e.clipboardData && e.clipboardData.getData("text/plain");
    if (!plainText) {
      return;
    }
    const paragraphs = plainText.split("\n").map((text) =>
      Paragraph.create({
        text,
      })
    );
    const blockMap = createOrderedMapFromValues(paragraphs);
    this._modifyFn((contentState, selection) => {
      return RichtextModifiers.insertFragment(
        contentState,
        selection,
        blockMap
      );
    });
  }

  onCopy(e: ClipboardEvent) {
    this._modifyFn((contentState, selection) => {
      processCopy(contentState, selection, e);
      return {
        selection,
      };
    });
  }

  onCut(e: ClipboardEvent) {
    this._modifyFn((contentState, selection) => {
      processCopy(contentState, selection, e);
      return onBackspace(contentState, selection);
    });
  }

  toggleInlineStyle(style: ToggleInlineStyles) {
    this._modifyFn((contentState, selection) => {
      return toggleInlineStyle(contentState, selection, style);
    });
  }

  switchBlocksStyles(paragraphType: SwitchParagraphType) {
    this._modifyFn((contentState, selection) => {
      return switchParagraphType(contentState, selection, paragraphType);
    });
  }
}

export { RichTextOperationHandler };
