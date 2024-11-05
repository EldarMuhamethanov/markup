type HeaderBlock = {
  type: "header";
  order: number;
  text: string;
};

type QuoteBlock = {
  type: "quote";
  text: string;
};

type OrderedListItemBlock = {
  type: "orderedListItem";
  text: string;
};

type UnorderedListItemBlock = {
  type: "unorderedListItem";
  text: string;
};

type CodeBlock =
  | {
      type: "codeOpen";
    }
  | {
      type: "codeClose";
    }
  | {
      type: "codeRow";
      text: string;
    };

type PlainTextBlock = {
  type: "plainText";
  text: string;
};

type TableHeaderBlock = {
  type: "tableHeader";
  headers: string[];
};

type TableRowBlock = {
  type: "tableRow";
  cells: string[];
};

type TableBlock = TableHeaderBlock | TableRowBlock;

type BlockData =
  | HeaderBlock
  | OrderedListItemBlock
  | UnorderedListItemBlock
  | QuoteBlock
  | CodeBlock
  | TableBlock
  | PlainTextBlock;

type DefaultGroup = {
  type: "default";
  blocks: Exclude<
    BlockData,
    QuoteBlock | OrderedListItemBlock | UnorderedListItemBlock | CodeBlock
  >[];
};

type OrderedListGroup = {
  type: "orderedList";
  blocks: OrderedListItemBlock[];
};

type UnorderedListGroup = {
  type: "unorderedList";
  blocks: UnorderedListItemBlock[];
};

type CodeGroup = {
  type: "code";
  blocks: CodeBlock[];
};

type QuoteGroup = {
  type: "quote";
  blocks: QuoteBlock[];
};

type TableGroup = {
  type: "table";
  headers: string[];
  rows: string[][];
};

type GroupBlockData =
  | DefaultGroup
  | OrderedListGroup
  | UnorderedListGroup
  | CodeGroup
  | QuoteGroup
  | TableGroup;

export type {
  GroupBlockData,
  DefaultGroup,
  OrderedListGroup,
  UnorderedListGroup,
  CodeGroup,
  QuoteGroup,
  TableGroup,
  BlockData,
  HeaderBlock,
  QuoteBlock,
  OrderedListItemBlock,
  UnorderedListItemBlock,
  CodeBlock,
  PlainTextBlock,
  TableHeaderBlock,
  TableBlock,
  TableRowBlock,
};
