import { message } from "antd";
import {
  ContentState,
  ContentStateData,
} from "../../richtext/model/content/ContentState";
import { downloadAsFile } from "../../core/file/downloadFile";
import { createHTMLDocument } from "../../backend/createHTML";
import { getHtmlWithRemappedImages } from "../view/header/getHtmlWithRemappedImages";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { googleDriveApi } from "../../api/GoogleDriveApi";
import { RefObject } from "react";

export const useExportHandlers = (
  contentState: ContentStateData | null,
  pdfTargetRef: RefObject<HTMLElement | null>,
  setGeneratePdfModalOpened: (value: boolean) => void
) => {
  const handleExportToMarkdown = (fileName: string) => {
    const markdownText = contentState && ContentState.getText(contentState);
    if (markdownText) {
      downloadAsFile(markdownText, `${fileName}.md`);
    }
  };

  const handleExportToHTML = async (fileName: string) => {
    if (!pdfTargetRef.current) return;

    const htmlDocument = await createHTMLDocument(
      pdfTargetRef.current.outerHTML,
      fileName
    );
    downloadAsFile(htmlDocument, `${fileName}.html`);
  };

  const handleExportToPDF = async (fileName: string) => {
    if (!pdfTargetRef.current) return;

    setGeneratePdfModalOpened(true);
    const restoreUrlsFn = await getHtmlWithRemappedImages(
      pdfTargetRef.current as HTMLDivElement
    );

    await generatePDF(pdfTargetRef, {
      filename: `${fileName}.pdf`,
      page: { margin: Margin.MEDIUM },
      resolution: Resolution.MEDIUM,
    });

    restoreUrlsFn();
    setGeneratePdfModalOpened(false);
  };

  const handleExportToGDrive = async (fileName: string) => {
    try {
      const markdownText = contentState && ContentState.getText(contentState);
      if (!markdownText) return;

      const result = await googleDriveApi.showPicker("export");
      if (!result) return;

      if (result.action === "picked") {
        if (!result.folderId) {
          message.info(
            "Папка не выбрана. Выберите папку для сохранения или нажмите 'Отмена' для сохранения в корень"
          );
          return;
        }
        await googleDriveApi.uploadFile(
          fileName + ".md",
          markdownText,
          result.folderId
        );
        message.success(
          "Файл успешно экспортирован в выбранную папку Google Drive"
        );
      } else if (result.action === "cancelled") {
        await googleDriveApi.uploadFile(fileName + ".md", markdownText);
        message.success("Файл успешно экспортирован в корень Google Drive");
      }
    } catch (error) {
      console.error("Ошибка экспорта в Google Drive:", error);
      message.error("Ошибка экспорта в Google Drive");
    }
  };

  return {
    handleExportToMarkdown,
    handleExportToHTML,
    handleExportToPDF,
    handleExportToGDrive,
  };
};
