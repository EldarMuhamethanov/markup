const textPlainRegexp =
  /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i;

const inlineStylesMap = {
  bold: {
    regex:
      /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,
    color: "red",
  },
  italic: {
    regex:
      /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,
    color: "green",
  },
  strikethrow: {
    regex: /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,
    color: "blue",
  },
  marked: {
    regex: /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/,
    color: "brown",
  },
  subscript: {
    regex: /^~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~/,
    color: "pink",
  },
  superscript: {
    regex: /^\^((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)\^/,
    color: "purple",
  },
};

function parseInlineStyles(str: string): string {
  let res = "";
  let source = str;

  while (source) {
    let captured = false;
    for (const { color, regex } of Object.values(inlineStylesMap)) {
      const match = source.match(regex);
      if (match && match[0]) {
        captured = true;
        const matchedStr = match[0];
        const inner = match[2] || match[1];
        const wrapper = matchedStr.slice(
          0,
          (matchedStr.length - inner.length) / 2
        );
        const parsed = parseInlineStyles(inner);
        const newContent = `<span style="color: ${color};">${wrapper}${parsed}${wrapper}</span>`;
        res += newContent;
        source = source.slice(matchedStr.length);
        break;
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

export { parseInlineStyles };
