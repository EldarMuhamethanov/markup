import { MenuProps, message } from "antd";
import { RefObject } from "react";
import { documentsMenuModel, selectedDocumentData } from "../model/AppModel";
import { ContentState } from "../../richtext/model/content/ContentState";
import { htmlToMarkdown } from "../../core/html/htmlToMarkdown";
import { googleDriveApi } from "../../api/GoogleDriveApi";

export const useImportHandlers = (
  inputRef: RefObject<HTMLInputElement>,
  htmlInputRef: RefObject<HTMLInputElement>
) => {
  const handleImportFromGDrive = async () => {
    try {
      const result = await googleDriveApi.showPicker("import");
      if (result) {
        const { name, content } = result;
        documentsMenuModel.importMarkdownFile(name, content);
        message.success("Файл успешно импортирован");
      }
    } catch (error) {
      console.error("Ошибка импорта из Google Drive:", error);
    }
  };

  const handleImportMenuClick: MenuProps["onClick"] = async (e) => {
    const importHandlers = {
      markdown: () => inputRef.current?.click(),
      html: () => htmlInputRef.current?.click(),
      gdrive: handleImportFromGDrive,
    };

    await importHandlers[e.key as keyof typeof importHandlers]?.();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newContentState = ContentState.createByContent(content);
      documentsMenuModel.createDocument("file", file.name);
      selectedDocumentData.setContentState(newContentState);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleHtmlImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const markdownContent = htmlToMarkdown(content);
      const newContentState = ContentState.createByContent(markdownContent);
      const cleanFileName = file.name.replace(/\.html?$/, "");
      documentsMenuModel.createDocument("file", cleanFileName);
      selectedDocumentData.setContentState(newContentState);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return {
    handleImportMenuClick,
    handleFileImport,
    handleHtmlImport,
  };
}; 