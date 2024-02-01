import { v4 } from "uuid";

interface ParagraphData {
  key: string;
  text: string;
}

const Paragraph = {
  create(config: Partial<ParagraphData>): ParagraphData {
    return {
      key: config.key || v4(),
      text: config.text || "",
    };
  },
};

export { Paragraph };

export type { ParagraphData };
