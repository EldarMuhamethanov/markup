import { ContentStateData } from "../model/content/ContentState";
import { SelectionStateData, SelectionState } from "../model/selection/SelectionState";
import { ModifyRichtextFnResult } from "../richtextOperation/ModifyRichtextFn";
import { RichtextModifiers } from "./RichtextModifiers";
import { getParagraphType } from "../view/paragraphBlock/getParagraphType";

function onEnter(
  contentState: ContentStateData,
  selection: SelectionStateData
): ModifyRichtextFnResult {
  const currentBlock = contentState.blockMap.blocks[selection.startKey];
  const isAtEnd = selection.startOffset === currentBlock.text.length;
  
  if (isAtEnd && SelectionState.isCollapsed(selection)) {
    const type = getParagraphType(currentBlock.text);
    
    // Получаем отступ из текущей строки
    const indentation = currentBlock.text.match(/^(\s*)/)?.[1] || "";
    
    // Проверяем, пустой ли блок (учитывая отступы)
    if (type === "unordered-list-item" && currentBlock.text.trim() === "-") {
      currentBlock.text = "";
      return {
        selection: SelectionState.createCollapsed({
          startKey: selection.startKey,
          startOffset: 0,
        }),
      };
    }
    
    if (type === "ordered-list-item" && currentBlock.text.match(/^\s*\d+\.\s*$/)) {
      currentBlock.text = "";
      return {
        selection: SelectionState.createCollapsed({
          startKey: selection.startKey,
          startOffset: 0,
        }),
      };
    }
    
    if (type === "quote" && currentBlock.text.trim() === ">") {
      currentBlock.text = "";
      return {
        selection: SelectionState.createCollapsed({
          startKey: selection.startKey,
          startOffset: 0,
        }),
      };
    }

    // Добавляем соответствующий префикс для нового блока
    let prefix = indentation; // Начинаем с отступа
    if (type === "unordered-list-item") {
      prefix += "- ";
    } else if (type === "ordered-list-item") {
      // Извлекаем номер из текущего элемента и увеличиваем его
      const match = currentBlock.text.match(/^(\s*?)(\d+)\./);
      const nextNumber = match ? parseInt(match[2]) + 1 : 1;
      prefix += `${nextNumber}. `;
    } else if (type === "quote") {
      prefix += "> ";
    }

    const result = RichtextModifiers.split(contentState, selection);
    if (prefix && contentState) {
      const newBlock = contentState.blockMap.blocks[result.selection.startKey];
      newBlock.text = prefix + newBlock.text;
      result.selection = SelectionState.createCollapsed({
        startKey: result.selection.startKey,
        startOffset: prefix.length,
      });
    }
    return result;
  }

  return RichtextModifiers.split(contentState, selection);
}

export { onEnter };
