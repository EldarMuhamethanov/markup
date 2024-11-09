import {
  DownOutlined,
  QuestionCircleOutlined,
  GithubOutlined,
  ExportOutlined,
  ImportOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  Html5Outlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps, Space, Tooltip } from "antd";
import React, { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { documentsMenuModel, selectedDocumentData } from "../../model/AppModel";
import { ContentState } from "../../../richtext/model/content/ContentState";
import { downloadAsFile } from "../../../core/file/downloadFile";
import { PdfTargetContext } from "../padConvertation/PdfTargetContext";
import generatePDF, { Margin, Resolution } from "react-to-pdf";
import { createHTMLDocument } from "../../../backend/createHTML";
import { useInputFile } from "../../../core/file/useInputFile";
import { getHtmlWithRemappedImages } from "./getHtmlWithRemappedImages";
import { GeneratePdfModalLoadingModal } from "./GeneratePdfModalLoadingModal";
import { MarkdownHelpModal } from "./MarkdownHelpModal";
import { FeedbackModal } from "./FeedbackModal";
import styles from "./Header.module.css";
import { htmlToMarkdown } from "../../../core/html/htmlToMarkdown";

const exportItems: MenuProps["items"] = [
  {
    label: "HTML",
    key: "html",
    icon: <Html5Outlined />,
  },
  {
    label: "PDF",
    key: "pdf",
    icon: <FilePdfOutlined />,
  },
  {
    label: "Markdown",
    key: "markdown",
    icon: <FileMarkdownOutlined />,
  },
];

const importItems: MenuProps["items"] = [
  {
    label: "Markdown",
    key: "markdown",
    icon: <FileMarkdownOutlined />,
  },
  {
    label: "HTML",
    key: "html",
    icon: <Html5Outlined />,
  },
];

const RightPart: React.FC = observer(() => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const contentState = selectedDocumentData.contentState;
  const { targetRef: pdfTargetRef } = useContext(PdfTargetContext);
  const [generatePdfModalOpened, setGeneratePdfModalOpened] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const htmlInputRef = useRef<HTMLInputElement | null>(null);

  const handleExportToMarkdown = (fileName: string) => {
    const markdownText = contentState && ContentState.getText(contentState);
    if (markdownText) {
      downloadAsFile(markdownText, `${fileName}.md`);
    }
  };

  const handleExportToHTML = async (fileName: string) => {
    if (!pdfTargetRef.current) {
      return;
    }
    const htmlDocument = await createHTMLDocument(
      pdfTargetRef.current.outerHTML,
      fileName
    );
    downloadAsFile(htmlDocument, `${fileName}.html`);
  };

  const handleExportToPDF = async (fileName: string) => {
    if (!pdfTargetRef.current) {
      return;
    }
    setGeneratePdfModalOpened(true);
    const restoreUrlsFn = await getHtmlWithRemappedImages(pdfTargetRef.current);
    await generatePDF(pdfTargetRef, {
      filename: `${fileName}.pdf`,
      page: {
        margin: Margin.MEDIUM,
      },
      resolution: Resolution.MEDIUM,
    });
    restoreUrlsFn();
    setGeneratePdfModalOpened(false);
  };

  const handleExportMenuClick: MenuProps["onClick"] = async (e) => {
    const fileName = selectedDocumentData.fileName;
    if (!fileName) {
      return;
    }
    switch (e.key) {
      case "markdown": {
        handleExportToMarkdown(fileName);
        break;
      }
      case "html": {
        await handleExportToHTML(fileName);
        break;
      }
      case "pdf": {
        await handleExportToPDF(fileName);
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
      case "html": {
        htmlInputRef.current?.click();
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

  useInputFile(htmlInputRef, (content, fileName) => {
    const markdownContent = htmlToMarkdown(content);
    const newContentState = ContentState.createByContent(markdownContent);
    
    if (contentState) {
      selectedDocumentData.setContentState(newContentState);
    } else {
      const cleanFileName = fileName.replace(/\.html?$/, "");
      documentsMenuModel.createDocument("file", cleanFileName);
      selectedDocumentData.setContentState(newContentState);
    }
  });

  const moreMenuItems: MenuProps["items"] = [
    {
      label: "GitHub",
      key: "github",
      icon: <GithubOutlined />,
      onClick: () =>
        window.open("https://github.com/EldarMuhamethanov/markup", "_blank"),
    },
    {
      label: "Справка по Markdown",
      key: "help",
      icon: <QuestionCircleOutlined />,
      onClick: () => setIsHelpModalOpen(true),
    },
    {
      label: "Обратная связь",
      key: "feedback",
      icon: <MessageOutlined />,
      onClick: () => setIsFeedbackModalOpen(true),
    },
  ];

  return (
    <Flex gap={10} align="center">
      <input
        ref={inputRef}
        type={"file"}
        accept={".md"}
        aria-label="Импорт Markdown файла"
        style={{
          display: "none",
        }}
      />
      <input
        ref={htmlInputRef}
        type={"file"}
        accept={".html,.htm"}
        aria-label="Импорт HTML файла"
        style={{
          display: "none",
        }}
      />
      <div className={styles.desktopButtons}>
        <Tooltip title="Открыть репозиторий проекта">
          <Button
            type="text"
            icon={<GithubOutlined />}
            onClick={() =>
              window.open(
                "https://github.com/EldarMuhamethanov/markup",
                "_blank"
              )
            }
          >
            GitHub
          </Button>
        </Tooltip>
        <Tooltip title="Открыть справку по Markdown">
          <Button
            type="text"
            icon={<QuestionCircleOutlined />}
            onClick={() => setIsHelpModalOpen(true)}
          >
            Справка по Markdown
          </Button>
        </Tooltip>
        <Tooltip title="Оставить отзыв">
          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={() => setIsFeedbackModalOpen(true)}
          >
            Обратная связь
          </Button>
        </Tooltip>
      </div>

      <div className={styles.mobileButtons}>
        <Dropdown menu={{ items: moreMenuItems }} trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      </div>

      {contentState && (
        <Dropdown menu={exportMenuProps} trigger={["click"]}>
          <Button icon={<ExportOutlined />}>
            <Space>
              <span className={styles.buttonText}>Экспорт</span>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      )}
      <Dropdown menu={importMenuProps} trigger={["click"]}>
        <Button icon={<ImportOutlined />}>
          <Space>
            <span className={styles.buttonText}>Импорт</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <GeneratePdfModalLoadingModal isOpen={generatePdfModalOpened} />
      <MarkdownHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </Flex>
  );
});

export { RightPart };
