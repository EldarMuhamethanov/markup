import React from "react";
import { CodeGroup } from "../../common/types";

const CodeBlockView: React.FC<CodeGroup> = (group) => {
  const text = group.blocks
    .map((block) => {
      if (block.type === "codeOpen" || block.type === "codeClose") {
        return null;
      }
      return block.text;
    })
    .filter((block) => block !== null)
    .join("\n");

  return (
    <pre>
      <code>{text}</code>
    </pre>
  );
};

export { CodeBlockView };
