export function htmlToMarkdown(html: string): string {
  // Создаем временный div для парсинга HTML и извлекаем только содержимое body
  const div = document.createElement("div");
  const bodyContent = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || html;
  div.innerHTML = bodyContent.trim();

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent?.replace(/\n\s+/g, "\n") || "";
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    const element = node as HTMLElement;
    // Обработка различных HTML тегов
    switch (element.tagName.toLowerCase()) {
      case "h1":
        return `# ${processChildren(element)}\n\n`;
      case "h2":
        return `## ${processChildren(element)}\n\n`;
      case "h3":
        return `### ${processChildren(element)}\n\n`;
      case "h4":
        return `#### ${processChildren(element)}\n\n`;
      case "h5":
        return `##### ${processChildren(element)}\n\n`;
      case "h6":
        return `###### ${processChildren(element)}\n\n`;
      case "p":
        return `${processChildren(element)}\n\n`;
      case "strong":
      case "b":
        return `**${processChildren(element)}**`;
      case "em":
      case "i":
        return `*${processChildren(element)}*`;
      case "del":
      case "s":
        return `~~${processChildren(element)}~~`;
      case "mark":
        return `==${processChildren(element)}==`;
      case "sub":
        return `~${processChildren(element)}~`;
      case "sup":
        return `^${processChildren(element)}^`;
      case "code":
        if (element.parentElement?.tagName.toLowerCase() === "pre") {
          return processChildren(element);
        }
        return `\`${processChildren(element)}\``;
      case "pre":
        return `\`\`\`\n${processChildren(element)}\`\`\`\n\n`;
      case "blockquote":
        return `> ${processChildren(element).replace(/\n/g, "\n> ")}\n\n`;
      case "a":
        const href = element.getAttribute("href");
        const title = element.getAttribute("title");
        const linkText = processChildren(element);
        return title
          ? `[${linkText}](${href} "${title}")`
          : `[${linkText}](${href})`;
      case "img":
        const alt = element.getAttribute("alt") || "";
        const src = element.getAttribute("src") || "";
        return `![${alt}](${src})`;
      case "ul":
        return processChildren(element) + "\n";
      case "ol":
        return processChildren(element) + "\n";
      case "li": {
        const parent = element.parentElement;
        const index = Array.from(parent?.children || []).indexOf(element);
        const indent = getListIndentLevel(element);
        const spaces = "  ".repeat(indent);

        if (parent?.tagName.toLowerCase() === "ol") {
          return `${spaces}${index + 1}. ${processChildren(element)}\n`;
        }
        return `${spaces}- ${processChildren(element)}\n`;
      }
      case "table":
        return processTable(element) + "\n\n";
      case "br":
        return "\n";
      default:
        return processChildren(element);
    }
  }

  function processChildren(element: HTMLElement): string {
    return Array.from(element.childNodes)
      .map((node) => processNode(node))
      .join("");
  }

  function getListIndentLevel(element: HTMLElement): number {
    let level = 0;
    let parent = element.parentElement;

    while (parent) {
      if (
        parent.tagName.toLowerCase() === "ul" ||
        parent.tagName.toLowerCase() === "ol"
      ) {
        const grandparent = parent.parentElement;
        if (
          grandparent &&
          (grandparent.tagName.toLowerCase() === "ul" ||
            grandparent.tagName.toLowerCase() === "ol")
        ) {
          level++;
        }
      }
      parent = parent.parentElement;
    }

    return level;
  }

  function processTable(table: HTMLElement): string {
    // Приводим HTMLElement к HTMLTableElement
    const tableElement = table as HTMLTableElement;
    const rows = Array.from(tableElement.rows);
    if (rows.length === 0) return "";

    // Обработка заголовков
    const headerRow = rows[0] as HTMLTableRowElement;
    const headerCells = Array.from(headerRow.cells);
    const headers = headerCells.map((cell) => cell.textContent?.trim() || "");

    // Создание разделительной строки
    const separators = headers.map(() => "---");

    // Обработка данных
    const dataRows = rows.slice(1).map((row) =>
      Array.from((row as HTMLTableRowElement).cells)
        .map((cell) => cell.textContent?.trim() || "")
        .map((content) => content.replace(/\|/g, "\\|"))
    );

    // Сборка таблицы
    const headerRowStr = `| ${headers.join(" | ")} |`;
    const separatorRowStr = `| ${separators.join(" | ")} |`;
    const dataRowsStr = dataRows
      .map((row) => `| ${row.join(" | ")} |`)
      .join("\n");

    return `${headerRowStr}\n${separatorRowStr}\n${dataRowsStr}`;
  }

  return processNode(div)
    .trim()
    .replace(/\n\s*\n\s*\n/g, "\n\n"); // Убираем лишние пустые строки
}
