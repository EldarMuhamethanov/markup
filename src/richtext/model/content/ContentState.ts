import { Paragraph, ParagraphData } from "./ParagraphData";
import {
  createEmptyOrderedMap,
  createOrderedMapFromValues,
  getItemByIndex,
  getLastItem,
  OrderedMap,
} from "./OrderedMap";

type BlockMap = OrderedMap<ParagraphData>;

interface ContentStateData {
  blockMap: BlockMap;
}

const ContentState = {
  createByContent(content: string): ContentStateData {
    return {
      blockMap: createOrderedMapFromValues(
        content.split("\n").map((row) =>
          Paragraph.create({
            text: row,
          })
        )
      ),
    };
  },

  createEmpty(): ContentStateData {
    return {
      blockMap: createEmptyOrderedMap(),
    };
  },

  copy(contentState: ContentStateData): ContentStateData {
    const blocks: { [items: string]: ParagraphData } = {};
    Object.entries(contentState.blockMap.blocks).forEach(([key, data]) => {
      blocks[key] = { ...data };
    });
    return {
      blockMap: {
        order: [...contentState.blockMap.order],
        blocks,
      },
    };
  },

  createWithOneParagraph(): ContentStateData {
    const paragraph = Paragraph.create({
      text: "Здесь можно писать текст...",
    });
    return {
      blockMap: {
        order: [paragraph.key],
        blocks: {
          [paragraph.key]: paragraph,
        },
      },
    };
  },

  getFirstBlock(contentState: ContentStateData): ParagraphData | null {
    return getItemByIndex(contentState.blockMap, 0);
  },

  getLastBlock(contentState: ContentStateData): ParagraphData | null {
    return getLastItem(contentState.blockMap);
  },

  getText(contentState: ContentStateData) {
    return contentState.blockMap.order
      .map((key) => contentState.blockMap.blocks[key].text)
      .join("\n");
  },
};

export { ContentState };

export type { ContentStateData, BlockMap };
