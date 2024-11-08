import { useCallback, useState } from "react";
import { DocumentsMenuModel } from "../model/documents/DocumentsMenuModel";

interface UseMarkdownDragAndDropResult {
  isDragging: boolean;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export const useMarkdownDragAndDrop = (
  documentsMenuModel: DocumentsMenuModel
): UseMarkdownDragAndDropResult => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Проверяем, что перетаскивается файл .md
    const hasMarkdownFile = Array.from(e.dataTransfer.items).some(
      item => item.kind === 'file' && item.type === 'text/markdown' || 
        item.type === 'text/plain' && item.getAsFile()?.name.endsWith('.md')
    );

    if (hasMarkdownFile) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = Array.from(e.dataTransfer.files).find(
      file => file.name.endsWith('.md')
    );

    if (file) {
      const content = await file.text();
      documentsMenuModel.importMarkdownFile(file.name, content);
    }
  }, [documentsMenuModel]);

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
}; 