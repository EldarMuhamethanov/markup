import {
  BlockData,
  CodeBlock,
  GroupBlockData,
  OrderedListItemBlock,
  QuoteBlock,
  TableGroup,
  UnorderedListItemBlock,
} from "./types";

export const groupBlocks = (blocks: BlockData[]): GroupBlockData[] => {
  const groups: GroupBlockData[] = [];
  let currentCodeGroup: CodeBlock[] | null = null;
  let currentUnorderedList: UnorderedListItemBlock[] | null = null;
  let currentOrderedList: OrderedListItemBlock[] | null = null;
  let quoteList: QuoteBlock[] | null = null;
  let tableGroup: TableGroup | null = null;

  const appendCodeGroup = () => {
    if (currentCodeGroup) {
      groups.push({
        type: "code",
        blocks: currentCodeGroup,
      });
      currentCodeGroup = null;
    }
  };

  const appendUnorderedListGroup = () => {
    if (currentUnorderedList) {
      groups.push({
        type: "unorderedList",
        blocks: currentUnorderedList,
      });
      currentUnorderedList = null;
    }
  };

  const appendOrderedListGroup = () => {
    if (currentOrderedList) {
      groups.push({
        type: "orderedList",
        blocks: currentOrderedList,
      });
      currentOrderedList = null;
    }
  };

  const appendQuoteGroup = () => {
    if (quoteList) {
      groups.push({
        type: "quote",
        blocks: quoteList,
      });
      quoteList = null;
    }
  };

  const appendTableGroup = () => {
    if (tableGroup) {
      groups.push(tableGroup);
      tableGroup = null;
    }
  };

  blocks.forEach((block) => {
    if (block.type === "codeOpen") {
      currentCodeGroup = [];
      return;
    } else if (block.type === "codeRow") {
      if (currentCodeGroup) {
        currentCodeGroup.push(block);
      }
      return;
    } else if (block.type === "codeClose") {
      if (currentCodeGroup) {
        currentCodeGroup.push(block);
        appendCodeGroup();
      }
      return;
    }

    if (block.type === "unorderedListItem") {
      if (!currentUnorderedList) {
        currentUnorderedList = [];
      }
      currentUnorderedList.push(block);
      return;
    }
    if (block.type === "orderedListItem") {
      if (!currentOrderedList) {
        currentOrderedList = [];
      }
      currentOrderedList.push(block);
      return;
    }
    if (block.type === "quote") {
      if (!quoteList) {
        quoteList = [];
      }
      quoteList.push(block);
      return;
    }
    if (block.type === "tableHeader") {
      if (!tableGroup) {
        tableGroup = {
          type: "table",
          headers: block.headers,
          rows: [],
        };
      }
      return;
    }
    if (block.type === "tableRow") {
      if (tableGroup) {
        tableGroup.rows.push(block.cells);
      }
      return;
    }

    appendUnorderedListGroup();
    appendOrderedListGroup();
    appendQuoteGroup();
    appendTableGroup();

    return groups.push({
      type: "default",
      blocks: [block],
    });
  });

  appendCodeGroup();
  appendUnorderedListGroup();
  appendOrderedListGroup();
  appendQuoteGroup();
  appendTableGroup();

  return groups;
};
