// Types
type InlineStyle = {
  regex: RegExp;
  tag: string;
  styles: string;
};

type InlineStylesMap = {
  [key: string]: InlineStyle;
};

// Constants
const textPlainRegexp =
  /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i;

const imageWithoutLinkRegex = /^\s*!\[\s*(.+?)\s*\]\((.+?)\)/;
const imageWithLinkRegex = /^\[\s*!\[\s*(.+?)\s*\]\((.+?)\)\]\((\s*(.+?)\s*)\)/;
const linkRegex = /\s*(https?:\/\/[\w-]{1,32}\.[\w-]{1,32}[^\s@]*)\s*/;
const hyperlinkRegex = /^\[\s*(.+?)\s*\]\(\s*(.+?)\s*\)/;

// Inline styles configuration
const inlineStylesMap: InlineStylesMap = {
  bold: {
    regex:
      /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,
    tag: "b",
    styles: "font-weight: 600; color: #1a202c;",
  },
  italic: {
    regex:
      /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,
    tag: "i",
    styles: "font-style: italic;",
  },
  strikethrow: {
    regex: /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,
    tag: "s",
    styles: "text-decoration: line-through;",
  },
  marked: {
    regex: /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,
    tag: "mark",
    styles: "background: #ff0; color: #000; padding: 0.2em;",
  },
  inlineCode: {
    regex: /^`((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)`/,
    tag: "code",
    styles:
      "font-family: 'Fira Code', 'Consolas', monospace; color: #805ad5; background-color: #f7fafc; padding: 2px 6px; border-radius: 4px; font-size: 0.9em;",
  },
  subscript: {
    regex: /^~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~/,
    tag: "sub",
    styles: "font-size: 0.8em;",
  },
  superscript: {
    regex: /^\^((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)\^/,
    tag: "sup",
    styles: "font-size: 0.8em;",
  },
};

// Helper functions
const checkUrl = (url: string): string | null => {
  const match = url.match(linkRegex);
  return match ? url.trim() : null;
};

const processInlineStyle = (
  source: string,
  style: InlineStyle
): {
  captured: boolean;
  result: string;
  remainingSource: string;
} => {
  const match = source.match(style.regex);
  if (match && match[0]) {
    const matchedStr = match[0];
    const inner = match[2] || match[1];
    const parsed = getStyledRow(inner);
    return {
      captured: true,
      result: `<${style.tag} style="${style.styles}">${parsed}</${style.tag}>`,
      remainingSource: source.slice(matchedStr.length),
    };
  }
  return { captured: false, result: "", remainingSource: source };
};

const processImage = (
  source: string
): {
  captured: boolean;
  result: string;
  remainingSource: string;
} => {
  // Process image with link
  const imageWithLinkMatch = source.match(imageWithLinkRegex);
  if (
    imageWithLinkMatch &&
    imageWithLinkMatch[1] &&
    imageWithLinkMatch[2] &&
    imageWithLinkMatch[3]
  ) {
    const imageUrl = checkUrl(imageWithLinkMatch[2]);
    const linkUrl = checkUrl(imageWithLinkMatch[3]);
    if (imageUrl && linkUrl) {
      return {
        captured: true,
        result: `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer"><img alt="${imageWithLinkMatch[1]}" src="${imageUrl}" style="max-width: 100%; height: auto; border-radius: 6px;" loading="lazy" /></a>`,
        remainingSource: source.slice(imageWithLinkMatch[0].length),
      };
    }
  }

  // Process image without link
  const matchWithoutLink = source.match(imageWithoutLinkRegex);
  if (matchWithoutLink && matchWithoutLink[1] && matchWithoutLink[2]) {
    const imageUrl = checkUrl(matchWithoutLink[2]);
    if (imageUrl) {
      return {
        captured: true,
        result: `<img alt="${matchWithoutLink[1]}" src="${imageUrl}" style="max-width: 100%; height: auto; border-radius: 6px;" loading="lazy" />`,
        remainingSource: source.slice(matchWithoutLink[0].length),
      };
    }
  }

  return { captured: false, result: "", remainingSource: source };
};

const processHyperlink = (
  source: string
): {
  captured: boolean;
  result: string;
  remainingSource: string;
} => {
  const hyperlinkMatch = source.match(hyperlinkRegex);
  if (hyperlinkMatch && hyperlinkMatch[1] && hyperlinkMatch[2]) {
    const linkUrl = checkUrl(hyperlinkMatch[2]);
    if (linkUrl) {
      return {
        captured: true,
        result: `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #4c51bf; text-decoration: none; transition: color 0.2s ease;">${hyperlinkMatch[1]}</a>`,
        remainingSource: source.slice(hyperlinkMatch[0].length),
      };
    }
  }
  return { captured: false, result: "", remainingSource: source };
};

// Изменяем регулярное выражение для сносок
const footnoteReferenceRegex = /^\[\^([^\]]+)\]/;

// Обновляем функцию обработки сносок
const processFootnoteReference = (
  source: string
): {
  captured: boolean;
  result: string;
  remainingSource: string;
} => {
  const match = source.match(footnoteReferenceRegex);
  if (match) {
    const id = match[1];
    return {
      captured: true,
      result: `<sup><a href="#footnote-${id}" id="footnote-ref-${id}" class="footnote-reference">${id}</a></sup>`,
      remainingSource: source.slice(match[0].length),
    };
  }
  return { captured: false, result: "", remainingSource: source };
};

// Main function
function getStyledRow(str: string, withImages = false): string {
  let res = "";
  let source = str;

  while (source) {
    let captured = false;

    // Process inline styles
    for (const style of Object.values(inlineStylesMap)) {
      const {
        captured: stylesCaptured,
        result,
        remainingSource,
      } = processInlineStyle(source, style);
      if (stylesCaptured) {
        captured = true;
        res += result;
        source = remainingSource;
        break;
      }
    }

    // Process images if enabled
    if (!captured && withImages) {
      const {
        captured: imagesCaptured,
        result,
        remainingSource,
      } = processImage(source);
      if (imagesCaptured) {
        captured = true;
        res += result;
        source = remainingSource;
      }
    }

    // Process hyperlinks
    if (!captured) {
      const {
        captured: linkCaptured,
        result,
        remainingSource,
      } = processHyperlink(source);
      if (linkCaptured) {
        captured = true;
        res += result;
        source = remainingSource;
      }
    }

    // Process footnote references
    if (!captured) {
      const {
        captured: footnoteCaptured,
        result,
        remainingSource,
      } = processFootnoteReference(source);
      if (footnoteCaptured) {
        captured = true;
        res += result;
        source = remainingSource;
      }
    }

    // Process plain text
    if (!captured) {
      const match = source.match(textPlainRegexp);
      if (match && match[0]) {
        const matchedStr = match[0];
        res += matchedStr;
        source = source.slice(matchedStr.length);
      } else {
        res += source;
        break;
      }
    }
  }

  return res;
}

export { getStyledRow };
