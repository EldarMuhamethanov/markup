import React, { useEffect, useRef } from "react";
import { ParagraphData } from "../../model/content/ParagraphData";
import { ParagraphType } from "./getParagraphType";
import styles from "./ParagraphBlock.module.css";
import { getStylesWithMods } from "../../../core/styles/getStylesWithMods";
import { parseInlineStyles } from "./inlineStyles";

interface ParagraphBlockProps {
  paragraph: ParagraphData;
  paragraphType: ParagraphType;
}

const ParagraphBlock = ({ paragraph, paragraphType }: ParagraphBlockProps) => {
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const className = getStylesWithMods(styles.blockWrapper, {
    [styles.blockHeading]: paragraphType === "header",
    [styles.blockListItem]:
      paragraphType === "ordered-list-item" ||
      paragraphType === "unordered-list-item",
    [styles.blockQuote]: paragraphType === "quote",
    [styles.blockCode]:
      paragraphType === "code-block-open" ||
      paragraphType === "code-block-close",
    [styles.blockText]: paragraphType === "text",
  });

  useEffect(() => {
    if (!paragraphRef.current) {
      return;
    }
    if (!paragraph.text) {
      paragraphRef.current.innerHTML = "&ZeroWidthSpace;";
      return;
    }
    paragraphRef.current.innerHTML = parseInlineStyles(paragraph.text);
  }, [paragraph.text]);

  return (
    <div className={className} data-key={paragraph.key}>
      <p className={styles.paragraph} ref={paragraphRef}>
        {paragraph.text}
      </p>
    </div>
  );
};

export { ParagraphBlock };
