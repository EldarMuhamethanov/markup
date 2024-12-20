export const markdownStyles = `
.markdown {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  color: #374151;
  line-height: 1.7;
  font-size: 16px;
  white-space: pre-wrap;
  width: 800px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

/* Таблицы */
.markdown table {
  border-spacing: 0;
  border-collapse: separate;
  width: 100%;
  margin: 20px 0;
  font-size: 0.95em;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.markdown table > thead > tr > th {
  background-color: #f3f4f6;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 0.05em;
}

/* Код */
.markdown pre {
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 14px;
  padding: 24px;
  line-height: 1.6;
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid #e5e7eb;
  position: relative;
}

.markdown pre::-webkit-scrollbar {
  height: 8px;
}

.markdown pre::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.markdown pre::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.markdown pre::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.markdown code {
  font-family: "JetBrains Mono", "Fira Code", monospace;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #4f46e5;
  transition: color 0.2s ease;
}

.markdown code:hover {
  color: #6366f1;
}

/* Цитаты */
.markdown blockquote {
  margin: 24px 0;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.markdown blockquote > .markdown {
  font-style: italic;
  padding: 20px 24px;
  border-left: 4px solid #6366f1;
  margin: 0;
  color: #4b5563;
}

/* Заголовки */
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  margin-top: 36px;
  margin-bottom: 20px;
  line-height: 1.3;
  font-weight: 700;
  color: #111827;
}

.markdown h1 {
  font-size: 2.5em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 12px;
}

.markdown h2 {
  font-size: 2em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

/* Ссылки */
.markdown a {
  color: #6366f1;
  text-decoration: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid transparent;
}

.markdown a:hover {
  color: #4f46e5;
  border-bottom: 1px solid currentColor;
}

/* Изображения */
.markdown img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Списки */
.markdown ul,
.markdown ol {
  padding-left: 1.75em;
  margin: 20px 0;
}

.markdown li {
  margin: 8px 0;
  line-height: 1.7;
}

/* Горизонтальная линия */
.markdown hr {
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
  margin: 32px 0;
}

/* Добавляем стили для сносок */
.markdown-footnotes {
  margin-top: 32px;
  font-size: 0.9em;
  color: #4b5563;
}

.markdown-footnotes hr {
  margin: 24px 0;
  border: 0;
  height: 1px;
  background: #e5e7eb;
}

.footnote-item {
  margin: 8px 0;
  line-height: 1.6;
}

.footnote-content {
  display: flex;
  gap: 8px;
  align-items: baseline;
}

.footnote-reference {
  color: #6366f1;
  text-decoration: none;
  font-size: 0.8em;
}

.footnote-backref {
  margin-left: 4px;
  color: #6366f1;
  text-decoration: none;
  font-size: 0.8em;
}

.footnote-backref:hover {
  text-decoration: underline;
}

.code-block-wrapper {
  position: relative;
}

.copy-code-button {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  z-index: 1;
}

.code-block-wrapper:hover .copy-code-button {
  opacity: 1;
}

.copy-code-button:hover {
  background-color: #f9fafb;
  color: #4b5563;
  border-color: #d1d5db;
}

`;
