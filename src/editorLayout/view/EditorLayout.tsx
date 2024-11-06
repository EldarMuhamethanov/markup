"use client";

import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import { MarkdownEditorLayout } from "./markdownEditor/MarkdownEditorLayout";
import styles from "./EditorLayout.module.css";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";
import { PdfTargetContext } from "./padConvertation/PdfTargetContext";
import { useSingleLayoutEffect } from "@/core/hooks/useSingleLayoutEffect";
import {
  documentsMenuModel,
  filesDataModel,
  selectedDocumentData,
} from "../model/AppModel";
import { enablePatches } from "immer";
import "../../../public/Markdown.css";

const EditorLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useSingleLayoutEffect(() => {
    enablePatches();
    filesDataModel.init();
    selectedDocumentData.init();
    documentsMenuModel.init();
  });

  return (
    <PdfTargetContext.Provider value={{ targetRef: { current: null } }}>
      <Layout className={styles.mainLayout}>
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onSidebarCollapse={setSidebarCollapsed}
        />
        <Layout hasSider={true} className={styles.contentRow}>
          <Sidebar collapsed={sidebarCollapsed} />
          <Content>
            <MarkdownEditorLayout />
          </Content>
        </Layout>
      </Layout>
    </PdfTargetContext.Provider>
  );
};

export { EditorLayout };
