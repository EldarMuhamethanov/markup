import {
  BlockData,
  HeaderBlock,
  OrderedListItemBlock,
  QuoteBlock,
  TableAlignment,
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

const parseTableAlignment = (separator: string): TableAlignment => {
  const trimmed = separator.trim();
  if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
  if (trimmed.endsWith(':')) return 'right';
  if (trimmed.startsWith(':')) return 'left';
  return 'none';
};

const checkRow = (
  row: string,
  type: "tableHeader" | "tableRow" | "separator"
): (TableBlock | { type: "separator"; alignments: TableAlignment[] }) | null => {
  const isValidTableRow = row.trim().startsWith('|') || row.trim().endsWith('|');
  if (!isValidTableRow) return null;

  const cells = row
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell !== '');

  if (cells.length === 0) return null;

  if (type === "separator") {
    if (!cells.every(cell => cell.match(/^:?-+:?$/))) return null;
    return {
      type: "separator",
      alignments: cells.map(parseTableAlignment)
    };
  }

  if (type === "tableHeader") {
    return {
      type: "tableHeader",
      headers: cells,
      alignments: [] // Будет заполнено позже
    };
  }

  return {
    type: "tableRow",
    cells
  };
};

const checkHorizontalRule = (row: string): boolean => {
  return !!row.match(/^\*{3,}\s*$/);
};

export const getRowParser = () => {
  let codeBlockOpened = false;
  let tableState: {
    headerRow: TableHeaderBlock | null;
    alignments: TableAlignment[] | null;
    isInTable: boolean;
  } = {
    headerRow: null,
    alignments: null,
    isInTable: false
  };

  const resetTableState = () => {
    tableState = {
      headerRow: null,
      alignments: null,
      isInTable: false
    };
  };

  return (row: string): BlockData | null => {
    if (checkHorizontalRule(row)) {
      resetTableState();
      return {
        type: "horizontalRule",
      };
    }

    if (checkCodeOpenClose(row) && !codeBlockOpened) {
      codeBlockOpened = true;
      resetTableState();
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
      resetTableState();
      return blockParseResult;
    }

    // Обработка таблицы
    if (!tableState.isInTable) {
      const headerRow = checkRow(row, "tableHeader");
      if (headerRow && headerRow.type === "tableHeader") {
        tableState.headerRow = headerRow;
        tableState.isInTable = true;
        return headerRow;
      }
      return {
        type: "plainText",
        text: row
      };
    }

    if (tableState.isInTable && !tableState.alignments) {
      const separatorRow = checkRow(row, "separator");
      if (separatorRow && 'alignments' in separatorRow) {
        tableState.alignments = separatorRow.alignments;
        if (tableState.headerRow) {
          tableState.headerRow.alignments = separatorRow.alignments;
        }
        return null;
      }
      resetTableState();
      return {
        type: "plainText",
        text: row
      };
    }

    if (tableState.isInTable) {
      const tableRow = checkRow(row, "tableRow");
      if (tableRow && tableRow.type === "tableRow") {
        return tableRow;
      }
      resetTableState();
      return {
        type: "plainText",
        text: row
      };
    }

    return {
      type: "plainText",
      text: row
    };
  };
};
