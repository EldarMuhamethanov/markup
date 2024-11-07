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
  padding: 20px;
  line-height: 1.6;
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid #e5e7eb;
}

.markdown code {
  font-family: "JetBrains Mono", "Fira Code", monospace;
  background-color: #f3f4f6;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #6366f1;
  border: 1px solid #e5e7eb;
}

/* Цитаты */
.markdown blockquote {
  margin: 24px 0;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.markdown blockquote > p {
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
  margin: 20px 0;
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
...
`;
