"use client";

import React from "react";
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
  sidebarLayoutModel,
} from "../model/AppModel";
import { enablePatches } from "immer";
import { editorLayoutModel } from "../model/AppModel";
import { observer } from "mobx-react-lite";

const EditorLayout: React.FC = observer(() => {
  useSingleLayoutEffect(() => {
    enablePatches();
    filesDataModel.init();
    selectedDocumentData.init();
    documentsMenuModel.init();
    editorLayoutModel.init();
    sidebarLayoutModel.init();
  });

  return (
    <PdfTargetContext.Provider value={{ targetRef: { current: null } }}>
      <Layout className={styles.mainLayout}>
        <Header
          sidebarCollapsed={sidebarLayoutModel.isCollapsed}
          onSidebarCollapse={(collapsed) =>
            sidebarLayoutModel.setCollapsed(collapsed)
          }
        />
        <Layout hasSider={true} className={styles.contentRow}>
          <Sidebar collapsed={sidebarLayoutModel.isCollapsed} />
          <Content>
            <MarkdownEditorLayout />
          </Content>
        </Layout>
      </Layout>
    </PdfTargetContext.Provider>
  );
});

export { EditorLayout };
