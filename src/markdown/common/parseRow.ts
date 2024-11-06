import {
  BlockData,
  HeaderBlock,
  OrderedListItemBlock,
  QuoteBlock,
  TableBlock,
  TableHeaderBlock,
  UnorderedListItemBlock,
} from "./types";

const checkHeader = (row: string): HeaderBlock | null => {
  const match = row.match(/^(#{1,6})\s+(.+)/);
  if (match && match[1] && match[2]) {
    return {
      type: "header",
      text: match[2],
      order: match[1].length,
    };
  }
  return null;
};

const checkQuote = (row: string): QuoteBlock | null => {
  const match = row.match(/^>\s+(.+)/);
  if (match && match[1]) {
    return {
      type: "quote",
      text: match[1],
    };
  }
  return null;
};

const checkListItem = (
  row: string
): UnorderedListItemBlock | OrderedListItemBlock | null => {
  const indentMatch = row.match(/^(\s*)/);
  const level = indentMatch ? Math.floor(indentMatch[1].length / 2) : 0;
  
  const unorderedMatch = row.match(/^(\s*)-\s+(.+)/);
  if (unorderedMatch && unorderedMatch[2]) {
    return {
      type: "unorderedListItem",
      text: unorderedMatch[2],
      level,
    };
  }

  const orderedMatch = row.match(/^(\s*)\d+\.\s+(.+)/);
  if (orderedMatch && orderedMatch[2]) {
    return {
      type: "orderedListItem",
      text: orderedMatch[2],
      level,
    };
  }

  return null;
};

const checkCodeOpenClose = (row: string): boolean => {
  return !!row.match(/^```.*\s*$/);
};

const checkHeaderSeparator = (row: string, columnsCount: number): boolean => {
  const cells = row
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell) => !!cell);
  if (!cells.every((cell) => cell.match(/^-+$/))) {
    return false;
  }

  return cells.length <= columnsCount;
};

const checkRow = (
  row: string,
  type: "tableHeader" | "tableRow"
): TableBlock | null => {
  const match = row.match(/\|?\s*(\w+)\s*\|/);

  if (!match) {
    return null;
  }

  const cells = row.split("|").map((cell) => cell.trim());

  if (!cells[0]) {
    cells.splice(0, 1);
  }
  if (!cells[cells.length - 1]) {
    cells.splice(cells.length - 1, 1);
  }

  if (type === "tableHeader") {
    return {
      type,
      headers: cells,
    };
  }
  return {
    type,
    cells,
  };
};

const checkHorizontalRule = (row: string): boolean => {
  return !!row.match(/^\*{3,}\s*$/);
};

export const getRowParser = () => {
  let codeBlockOpened = false;
  let headerRowFinded = false;
  let tableContentStarted = false;
  let headerColumnsCount: number | null = null;

  const resetHeaderData = () => {
    headerRowFinded = false;
    tableContentStarted = false;
    headerColumnsCount = null;
  };

  return (row: string): BlockData | null => {
    if (checkHorizontalRule(row)) {
      resetHeaderData();
      return {
        type: "horizontalRule",
      };
    }
    if (checkCodeOpenClose(row) && !codeBlockOpened) {
      codeBlockOpened = true;
      resetHeaderData();
      return {
        type: "codeOpen",
      };
    }
    if (checkCodeOpenClose(row) && codeBlockOpened) {
      codeBlockOpened = false;
      return {
        type: "codeClose",
      };
    }
    if (codeBlockOpened) {
      return {
        type: "codeRow",
        text: row,
      };
    }
    const blockParseResult =
      checkHeader(row) || checkQuote(row) || checkListItem(row);

    if (blockParseResult) {
      resetHeaderData();
      return blockParseResult;
    }

    const checkHeaderRow = checkRow(row, "tableHeader");
    if (checkHeaderRow && !headerRowFinded) {
      headerRowFinded = true;
      headerColumnsCount = (checkHeaderRow as TableHeaderBlock).headers.length;
      return checkHeaderRow;
    }
    if (
      headerRowFinded &&
      headerColumnsCount &&
      checkHeaderSeparator(row, headerColumnsCount)
    ) {
      tableContentStarted = true;
      return null;
    }
    if (tableContentStarted) {
      return checkRow(row, "tableRow");
    }

    return {
      type: "plainText",
      text: row,
    };
  };
};
