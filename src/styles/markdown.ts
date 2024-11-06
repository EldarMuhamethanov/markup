export const markdownStyles = `
.markdown {
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
    sans-serif;
  color: #2d3748;
  line-height: 1.6;
  font-size: 16px;
  white-space: pre-wrap;
}

/* Таблицы */
.markdown table {
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 0.95em;
}

.markdown table > thead > tr > th {
  border: 1px solid #e2e8f0;
  background-color: #f7fafc;
  font-weight: 600;
}

.markdown table > thead > tr > th,
.markdown table > thead > tr > td {
  border-bottom-width: 2px;
}

.markdown table > thead > tr > th,
.markdown table > tbody > tr > td {
  padding: 12px 16px;
  line-height: 1.5;
  vertical-align: top;
  border: 1px solid #e2e8f0;
}

.markdown table > tbody > tr:nth-child(even) {
  background-color: #f8fafc;
}

/* Код */
.markdown pre {
  font-family: "Fira Code", "Consolas", monospace;
  font-size: 14px;
  padding: 16px;
  line-height: 1.6;
  background: linear-gradient(
    to bottom,
    #fff 0,
    #fff 0.75rem,
    #f8fafc 0.75rem,
    #f8fafc 2.75rem,
    #fff 2.75rem,
    #fff 4rem
  );
  background-size: 100% 4rem;
  word-break: break-all;
  word-wrap: break-word;
  color: #1a202c;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow-x: auto;
  margin: 16px 0;
}

.markdown code {
  font-family: "Fira Code", "Consolas", monospace;
  white-space: pre-line;
  background-color: #f7fafc;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: #805ad5;
}

/* Цитаты */
.markdown blockquote {
  margin: 20px 0;
  background-color: #f8fafc;
  border-radius: 6px;
}

.markdown blockquote > p {
  font-style: italic;
  padding: 16px 20px;
  border-left: 4px solid #805ad5;
  margin: 0;
  color: #4a5568;
}

/* Параграфы */
.markdown p {
  margin: 16px 0;
  line-height: 1.8;
}

/* Заголовки */
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  margin-top: 32px;
  margin-bottom: 16px;
  line-height: 1.3;
  font-weight: 600;
  color: #1a202c;
}

.markdown h1 {
  font-size: 2.25em;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 8px;
}

.markdown h2 {
  font-size: 1.875em;
  border-bottom: 1px solid #edf2f7;
  padding-bottom: 6px;
}

.markdown h3 {
  font-size: 1.5em;
}

.markdown h4 {
  font-size: 1.25em;
}

.markdown h5 {
  font-size: 1.125em;
}

.markdown h6 {
  font-size: 1em;
}

/* Списки */
.markdown ol,
.markdown ul {
  padding-left: 1.5em;
  margin: 16px 0;
}

.markdown ol {
  list-style-type: decimal;
}

.markdown ul {
  list-style-type: disc;
}

.markdown ul ul,
.markdown ul ol,
.markdown ol ul,
.markdown ol ol {
  margin: 8px 0;
}

.markdown li {
  margin: 4px 0;
  line-height: 1.6;
}

.markdown ul > li {
  list-style-type: disc;
}

.markdown ul > li > ul > li {
  list-style-type: circle;
}

.markdown ul > li > ul > li > ul > li {
  list-style-type: square;
}

.markdown ol > li {
  list-style-type: decimal;
}

.markdown ol > li > ol > li {
  list-style-type: lower-alpha;
}

.markdown ol > li > ol > li > ol > li {
  list-style-type: lower-roman;
}

/* Отступы для вложенных списков */
.markdown ul li ul,
.markdown ul li ol,
.markdown ol li ul,
.markdown ol li ol {
  margin-left: 1em;
}

/* Стили для текста внутри элементов списка */
.markdown li span {
  display: inline-block;
  vertical-align: top;
}

/* Ссылки */
.markdown a {
  color: #4c51bf;
  text-decoration: none;
  transition: color 0.2s ease;
}

.markdown a:hover {
  color: #667eea;
  text-decoration: underline;
}

/* Горизонтальная линия */
.markdown hr {
  border: 0;
  border-top: 1px solid #e2e8f0;
  margin: 24px 0;
}

/* Изображения */
.markdown img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 16px 0;
}

/* Выделение текста */
.markdown strong,
.markdown b {
  font-weight: 600;
  color: #1a202c;
}

.markdown em,
.markdown i {
  font-style: italic;
}

/* Дополнительные стили для улучшения читаемости */
.markdown .markdown > *:first-child {
  margin-top: 0;
}

.markdown .markdown > *:last-child {
  margin-bottom: 0;
}

...
`;