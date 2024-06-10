interface SelectionStateData {
  startKey: string;
  endKey: string;
  startOffset: number;
  endOffset: number;
  isReverse: boolean;
}

const SelectionState = {
  create(config: Partial<SelectionStateData>): SelectionStateData {
    return {
      startKey: config.startKey || "",
      endKey: config.endKey || "",
      startOffset: config.startOffset || 0,
      endOffset: config.endOffset || 0,
      isReverse: false,
    };
  },

  createCollapsed(config: {
    startKey: string;
    startOffset: number;
  }): SelectionStateData {
    return {
      startKey: config.startKey,
      startOffset: config.startOffset,
      endKey: config.startKey,
      endOffset: config.startOffset,
      isReverse: false,
    };
  },

  isCollapsed(selection: SelectionStateData) {
    return (
      selection.startKey === selection.endKey &&
      selection.startOffset === selection.endOffset
    );
  },

  compare(
    selection1: SelectionStateData | null,
    selection2: SelectionStateData | null
  ) {
    if (!selection1 || !selection2) {
      return selection1 === selection2;
    }
    return (
      selection1.startKey === selection2.startKey &&
      selection1.endKey === selection2.endKey &&
      selection1.startOffset === selection2.startOffset &&
      selection1.endOffset === selection2.endOffset &&
      selection1.isReverse === selection2.isReverse
    );
  },
};

export type { SelectionStateData };

export { SelectionState };
