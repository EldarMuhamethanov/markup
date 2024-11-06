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
  level: number;
};

interface UnorderedListItemBlock {
  type: "unorderedListItem";
  text: string;
  level: number;
  children?: UnorderedListItemBlock[];
}

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

type TableAlignment = "left" | "center" | "right" | "none";

type TableHeaderBlock = {
  type: "tableHeader";
  headers: string[];
  alignments: TableAlignment[];
};

type TableRowBlock = {
  type: "tableRow";
  cells: string[];
};

type TableBlock = TableHeaderBlock | TableRowBlock;

type HorizontalRuleBlock = {
  type: "horizontalRule";
};

type BlockData =
  | HeaderBlock
  | OrderedListItemBlock
  | UnorderedListItemBlock
  | QuoteBlock
  | CodeBlock
  | TableBlock
  | PlainTextBlock
  | HorizontalRuleBlock;

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
  alignments: TableAlignment[];
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
  HorizontalRuleBlock,
  TableAlignment,
};
