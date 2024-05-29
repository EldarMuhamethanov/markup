const textPlainRegexp =
  /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i;

const imageWithoutLinkRegex = /^\s*!\[\s*(.+)\s*\]\((.+)\)/;
const imageWithLinkRegex = /^\[\s*!\[\s*(.+)\s*\]\((.+)\)\]\((\s*(.+)\s*)\)/;
const linkRegex = /\s*(https?:\/\/[\w-]{1,32}\.[\w-]{1,32}[^\s@]*)\s*/;
const hyperlinkRegex = /^\[\s*(.+)\s*\]\(\s*(.+)\s*\)/;

const inlineStylesMap = {
  bold: {
    regex:
      /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,
    tag: "b",
    styles: "",
  },
  italic: {
    regex:
      /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,
    tag: "i",
    styles: "",
  },
  strikethrow: {
    regex: /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,
    tag: "s",
    styles: "",
  },
  marked: {
    regex: /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,
    tag: "mark",
    styles: "background: #ff0; color: #000;",
  },
  inlineCode: {
    regex: /^`((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)`/,
    tag: "code",
    styles: "color: #c7254e; background-color: #f9f2f4; border-radius: 4px;",
  },
  subscript: {
    regex: /^~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~/,
    tag: "sub",
    styles: "",
  },
  superscript: {
    regex: /^\^((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)\^/,
    tag: "sup",
    styles: "",
  },
};

const checkUrl = (url: string): string | null => {
  const match = url.match(linkRegex);
  if (match) {
    return url;
  }
  return null;
};

function getStyledRow(str: string, withImages = false): string {
  let res = "";
  let source = str;

  while (source) {
    let captured = false;
    for (const { tag, styles, regex } of Object.values(inlineStylesMap)) {
      const match = source.match(regex);
      if (match && match[0]) {
        captured = true;
        const matchedStr = match[0];
        const inner = match[2] || match[1];
        const parsed = getStyledRow(inner);
        const newContent = `<${tag} style="${styles}">${parsed}</${tag}>`;
        res += newContent;
        source = source.slice(matchedStr.length);
        break;
      }
    }
    if (!captured) {
      if (withImages) {
        const imageWithLinkMatch = source.match(imageWithLinkRegex);
        if (
          imageWithLinkMatch &&
          imageWithLinkMatch[1] &&
          imageWithLinkMatch[2] &&
          imageWithLinkMatch[3]
        ) {
          const matchedStr = imageWithLinkMatch[0];
          const imageUrl = checkUrl(imageWithLinkMatch[2]);
          const linkUrl = checkUrl(imageWithLinkMatch[3]);
          if (imageUrl && linkUrl) {
            captured = true;
            res += `<a href="${linkUrl}" target="_blank"><img alt="${imageWithLinkMatch[1]}" src="${imageUrl}" /></a>`;
            source = source.slice(matchedStr.length);
          }
        }
        const matchWithoutLink = source.match(imageWithoutLinkRegex);
        if (matchWithoutLink && matchWithoutLink[1] && matchWithoutLink[2]) {
          const matchedStr = matchWithoutLink[0];
          const imageUrl = checkUrl(matchWithoutLink[2]);
          if (imageUrl) {
            captured = true;
            res += `<img alt="${matchWithoutLink[1]}" src="${imageUrl}" />`;
            source = source.slice(matchedStr.length);
          }
        }
      }
    }
    if (!captured) {
      const hyperlinkMatch = source.match(hyperlinkRegex);
      if (hyperlinkMatch && hyperlinkMatch[1] && hyperlinkMatch[2]) {
        const matchedStr = hyperlinkMatch[0];
        const linkUrl = checkUrl(hyperlinkMatch[2]);
        if (linkUrl) {
          captured = true;
          res += `<a href="${linkUrl}" target="_blank">${hyperlinkMatch[1]}</a>`;
          source = source.slice(matchedStr.length);
        }
      }
    }
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
