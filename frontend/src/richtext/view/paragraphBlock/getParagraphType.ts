type ParagraphType =
  | "text"
  | "header"
  | "ordered-list-item"
  | "unordered-list-item"
  | "quote"
  | "code-block-open"
  | "code-block-close";

const paragraphTypeToRegexMap: Map<ParagraphType, RegExp> = new Map([
  ["header", /^(#{1,6}) /],
  ["ordered-list-item", /^\d+\. /],
  ["unordered-list-item", /^- /],
  ["quote", /^> /],
  ["code-block-open", /^```sh\s*$/],
  ["code-block-close", /^```\s*$/],
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
