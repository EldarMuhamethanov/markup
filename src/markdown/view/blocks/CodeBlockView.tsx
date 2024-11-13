import React from "react";
import { CodeGroup } from "../../common/types";

const CopyIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="code-block-wrapper">
      <button 
        className="copy-code-button" 
        onClick={handleCopy}
        data-testid="copy-code-button"
        title="Копировать код"
      >
        <CopyIcon />
      </button>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
};

export { CodeBlockView };
