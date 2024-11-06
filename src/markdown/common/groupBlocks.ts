import {
  BlockData,
  CodeBlock,
  GroupBlockData,
  OrderedListItemBlock,
  QuoteBlock,
  TableHeaderBlock,
  UnorderedListItemBlock,
} from "./types";

export const groupBlocks = (blocks: BlockData[]): GroupBlockData[] => {
  const groups: GroupBlockData[] = [];
  let currentCodeGroup: CodeBlock[] | null = null;
  let currentUnorderedList: UnorderedListItemBlock[] | null = null;
  let currentOrderedList: OrderedListItemBlock[] | null = null;
  let quoteList: QuoteBlock[] | null = null;
  let currentTableState: {
    headerBlock: TableHeaderBlock | null;
    rows: string[][];
  } | null = null;

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
        blocks: quoteList.filter((block, index) => 
          block.text !== "" || 
          (index < quoteList.length - 1 && quoteList[index + 1].text !== "")
        ),
      });
      quoteList = null;
    }
  };

  const appendTableGroup = () => {
    if (currentTableState?.headerBlock) {
      groups.push({
        type: "table",
        headers: currentTableState.headerBlock.headers,
        alignments: currentTableState.headerBlock.alignments,
        rows: currentTableState.rows
      });
    }
    currentTableState = null;
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
      if (quoteList.length > 0 && quoteList[quoteList.length - 1].text !== "") {
        block.text = block.text;
      }
      quoteList.push(block);
      return;
    }
    if (block.type === "tableHeader") {
      appendTableGroup();
      currentTableState = {
        headerBlock: block,
        rows: []
      };
      return;
    }
    if (block.type === "tableRow" && currentTableState) {
      currentTableState.rows.push(block.cells);
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
