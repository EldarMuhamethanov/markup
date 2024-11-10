import { Button, Dropdown, Space } from "antd";
import { DownOutlined, ExportOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { exportItems } from "../constants/menuItems";
import { useExportHandlers } from "../../../hooks/useExportHandlers";
import styles from "../Header.module.css";
import { PdfTargetContext } from "../../padConvertation/PdfTargetContext";
import { ContentStateData } from "../../../../richtext/model/content/ContentState";
import { selectedDocumentData } from "../../../model/AppModel";
import { MenuProps } from "antd";
import { GeneratePdfModalLoadingModal } from "../GeneratePdfModalLoadingModal";

interface ExportSectionProps {
  contentState: ContentStateData | null;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  contentState,
}) => {
  const { targetRef: pdfTargetRef } = useContext(PdfTargetContext);
  const [generatePdfModalOpened, setGeneratePdfModalOpened] = useState(false);

  const {
    handleExportToMarkdown,
    handleExportToHTML,
    handleExportToPDF,
    handleExportToGDrive,
  } = useExportHandlers(contentState, pdfTargetRef, setGeneratePdfModalOpened);

  const handleExportMenuClick: MenuProps["onClick"] = async (e) => {
    const fileName = selectedDocumentData.fileName;
    if (!fileName) return;

    const exportHandlers = {
      markdown: () => handleExportToMarkdown(fileName),
      html: () => handleExportToHTML(fileName),
      pdf: () => handleExportToPDF(fileName),
      gdrive: () => handleExportToGDrive(fileName),
    };

    await exportHandlers[e.key as keyof typeof exportHandlers]?.();
  };

  if (!contentState) return null;

  return (
    <>
      <Dropdown
        menu={{ items: exportItems, onClick: handleExportMenuClick }}
        trigger={["click"]}
      >
        <Button icon={<ExportOutlined />}>
          <Space>
            <span className={styles.buttonText}>Экспорт</span>
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
      <GeneratePdfModalLoadingModal isOpen={generatePdfModalOpened} />
    </>
  );
};
