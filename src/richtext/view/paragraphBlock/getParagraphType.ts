type ParagraphType =
  | "text"
  | "header"
  | "ordered-list-item"
  | "unordered-list-item"
  | "quote"
  | "code-block-open"
  | "code-block-close";

const paragraphTypeToRegexMap: Map<ParagraphType, RegExp> = new Map([
  ["header", /^\s*(#{1,6}) /],
  ["ordered-list-item", /^\s*\d+\. /],
  ["unordered-list-item", /^\s*- /],
  ["quote", /^\s*> /],
  ["code-block-open", /^\s*```sh\s*$/],
  ["code-block-close", /^\s*```\s*$/],
  ["text", /.*/],
]);

function getParagraphType(paragraphText: string): ParagraphType {
  return (
    Array.from(paragraphTypeToRegexMap.keys()).find((type) => {
      return !!paragraphText.match(paragraphTypeToRegexMap.get(type) as RegExp);
    }) || "text"
  );
}

export { getParagraphType };

export type { ParagraphType };
