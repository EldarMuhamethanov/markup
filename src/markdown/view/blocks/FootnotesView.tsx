import React from "react";
import { FootnoteDefinitionBlock } from "../../common/types";
import { useParseBlockContent } from "../../common/hooks/useParseBlockContent";

interface FootnotesViewProps {
  footnotes: FootnoteDefinitionBlock[];
}

export const FootnotesView: React.FC<FootnotesViewProps> = ({ footnotes }) => {
  if (footnotes.length === 0) return null;

  return (
    <div className="markdown-footnotes">
      <hr />
      <div className="footnotes">
        {footnotes.map((footnote) => (
          <div key={footnote.id} className="footnote-item">
            <div
              id={`footnote-${footnote.id}`}
              className="footnote-content"
            >
              <sup>{footnote.id}</sup>{" "}
              <span dangerouslySetInnerHTML={{ __html: footnote.content }} />
              <a
                href={`#footnote-ref-${footnote.id}`}
                className="footnote-backref"
                title="Вернуться к тексту"
              >
                ↩
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 