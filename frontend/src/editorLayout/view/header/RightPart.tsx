import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space } from "antd";
import React, { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import { documentsMenuModel, selectedDocumentData } from "../../model/AppModel";
import { ContentState } from "../../../richtext/model/content/ContentState";
import { downloadAsFile } from "../../../core/file/downloadFile";
import { PdfTargetContext } from "../padConvertation/PdfTargetContext";
import generatePDF, { Margin } from "react-to-pdf";
import { createHTMLDocument } from "./createHTML";
import { useInputFile } from "../../../core/file/useInputFile";
import {getHtmlWithRemappedImages} from "./getHtmlWithRemappedImages";

const exportItems: MenuProps["items"] = [
  {
    label: "HTML",
    key: "html",
  },
  {
    label: "PDF",
    key: "pdf",
  },
  {
    label: "Markdown",
    key: "markdown",
  },
];

const importItems: MenuProps["items"] = [
  {
    label: "Markdown",
    key: "markdown",
  },
];

const RightPart: React.FC = observer(() => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentState = selectedDocumentData.contentState;
  const { targetRef: pdfTargetRef } = useContext(PdfTargetContext);

  const handleExportMenuClick: MenuProps["onClick"] = async (e) => {
    const fileName = selectedDocumentData.fileName;
    if (!fileName) {
      return;
    }
    switch (e.key) {
      case "markdown": {
        const markdownText = contentState && ContentState.getText(contentState);
        if (markdownText) {
          downloadAsFile(markdownText, `${fileName}.md`);
        }
        break;
      }
      case "html": {
        if (!pdfTargetRef.current) {
          return;
        }
        const htmlDocument = await createHTMLDocument(
          pdfTargetRef.current,
          fileName
        );
        downloadAsFile(htmlDocument, `${fileName}.html`);
        break;
      }
      case "pdf": {
        if (!pdfTargetRef.current) {
          return;
        }
        const restoreUrlsFn = await getHtmlWithRemappedImages(pdfTargetRef.current)
        generatePDF(pdfTargetRef, {
          filename: `${fileName}.pdf`,
          page: {
            margin: Margin.MEDIUM,

          },
        }).finally(restoreUrlsFn)
      }
    }
  };

  const exportMenuProps = {
    items: exportItems,
    onClick: handleExportMenuClick,
  };

  const handleImportMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "markdown": {
        inputRef.current?.click();
        break;
      }
    }
  };

  const importMenuProps = {
    items: importItems,
    onClick: handleImportMenuClick,
  };

  useInputFile(inputRef, (content, fileName) => {
    const newContentState = ContentState.createByContent(content);
    if (contentState) {
      selectedDocumentData.setContentState(newContentState);
    } else {
      documentsMenuModel.createDocument("file", fileName);
      selectedDocumentData.setContentState(newContentState);
    }
  });

  return (
    <Space>
      <input
        ref={inputRef}
        type={"file"}
        accept={".md"}
        style={{
          display: "none",
        }}
      />
      {contentState && (
        <Dropdown menu={exportMenuProps} trigger={["click"]}>
          <Button>
            <Space>
              Экспорт
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      )}
      <Dropdown menu={importMenuProps} trigger={["click"]}>
        <Button>
          <Space>
            Импорт
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
});

export { RightPart };
