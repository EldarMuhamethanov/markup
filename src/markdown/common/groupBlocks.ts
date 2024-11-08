import {
  BlockData,
  CodeBlock,
  GroupBlockData,
  OrderedListItemBlock,
  QuoteBlock,
  TableHeaderBlock,
  UnorderedListItemBlock,
} from "./types";

export const groupBlocks = (blocks: BlockData[]): GroupBlockData[] => {
  const groups: GroupBlockData[] = [];
  let currentCodeGroup: CodeBlock[] | null = null;
  let currentUnorderedList: UnorderedListItemBlock[] | null = null;
  let currentOrderedList: OrderedListItemBlock[] | null = null;
  let quoteList: QuoteBlock[] | null = null;
  let currentTableState: {
    headerBlock: TableHeaderBlock | null;
    rows: string[][];
  } | null = null;

  const appendCodeGroup = () => {
    if (currentCodeGroup) {
      groups.push({
        type: "code",
        blocks: currentCodeGroup,
      });
      currentCodeGroup = null;
    }
  };

  const appendListGroup = <
    E extends "orderedList" | "unorderedList",
    T extends E extends "orderedList" ? OrderedListItemBlock : UnorderedListItemBlock
  >(
    items: T[] | null,
    type: E
  ) => {
    if (!items || items.length === 0) {
      return items;
    }

    // Создаем корневой массив для элементов верхнего уровня
    const rootItems: T[] = [];
    
    // Создаем копию массива для безопасной модификации
    const workingItems = items.map(item => ({...item})) as T[];
    
    // Проходим по каждому элементу списка
    workingItems.forEach((currentItem, index) => {
      let parentFound = false;
      
      // Идем в обратном порядке от текущего элемента
      for (let j = index - 1; j >= 0; j--) {
        const potentialParent = workingItems[j];
        
        if (potentialParent.level < currentItem.level) {
          // Проверяем, что это ближайший по уровню родитель
          let isClosestParent = true;
          for (let k = j + 1; k < index; k++) {
            if (workingItems[k].level < currentItem.level && 
                workingItems[k].level > potentialParent.level) {
              isClosestParent = false;
              break;
            }
          }
          
          if (isClosestParent) {
            if (!potentialParent.children) {
              potentialParent.children = [];
            }
            
            // Явно приводим тип для children
            if (type === "orderedList") {
              (potentialParent.children as OrderedListItemBlock[]).push(currentItem as OrderedListItemBlock);
            } else {
              (potentialParent.children as UnorderedListItemBlock[]).push(currentItem as UnorderedListItemBlock);
            }
            
            parentFound = true;
            break;
          }
        }
      }
      
      if (!parentFound) {
        rootItems.push(currentItem);
      }
    });

    groups.push({
      type,
      blocks: rootItems,
    } as GroupBlockData);
    
    return null;
  };

  const appendUnorderedListGroup = () => {
    currentUnorderedList = appendListGroup(
      currentUnorderedList,
      "unorderedList"
    );
  };

  const appendOrderedListGroup = () => {
    currentOrderedList = appendListGroup(currentOrderedList, "orderedList");
  };

  const appendQuoteGroup = () => {
    if (quoteList) {
      groups.push({
        type: "quote",
        blocks: quoteList!.filter(
          (block, index) =>
            block.text !== "" ||
            (index < quoteList!.length - 1 && quoteList![index + 1].text !== "")
        ),
      });
      quoteList = null;
    }
  };

  const appendTableGroup = () => {
    if (currentTableState?.headerBlock) {
      groups.push({
        type: "table",
        headers: currentTableState.headerBlock.headers,
        alignments: currentTableState.headerBlock.alignments,
        rows: currentTableState.rows,
      });
    }
    currentTableState = null;
  };

  blocks.forEach((block) => {
    if (block.type === "codeOpen") {
      currentCodeGroup = [];
      return;
    } else if (block.type === "codeRow") {
      if (currentCodeGroup) {
        currentCodeGroup.push(block);
      }
      return;
    } else if (block.type === "codeClose") {
      if (currentCodeGroup) {
        currentCodeGroup.push(block);
        appendCodeGroup();
      }
      return;
    }

    if (block.type === "unorderedListItem") {
      if (!currentUnorderedList) {
        currentUnorderedList = [];
      }
      currentUnorderedList.push(block);
      return;
    }
    if (block.type === "orderedListItem") {
      if (!currentOrderedList) {
        currentOrderedList = [];
      }
      currentOrderedList.push(block);
      return;
    }
    if (block.type === "quote") {
      if (!quoteList) {
        quoteList = [];
      }
      if (quoteList.length > 0 && quoteList[quoteList.length - 1].text !== "") {
        block.text = block.text;
      }
      quoteList.push(block);
      return;
    }
    if (block.type === "tableHeader") {
      appendTableGroup();
      currentTableState = {
        headerBlock: block,
        rows: [],
      };
      return;
    }
    if (block.type === "tableRow" && currentTableState) {
      currentTableState.rows.push(block.cells);
      return;
    }

    appendUnorderedListGroup();
    appendOrderedListGroup();
    appendQuoteGroup();
    appendTableGroup();

    return groups.push({
      type: "default",
      blocks: [block],
    });
  });

  appendCodeGroup();
  appendUnorderedListGroup();
  appendOrderedListGroup();
  appendQuoteGroup();
  appendTableGroup();

  return groups;
};
