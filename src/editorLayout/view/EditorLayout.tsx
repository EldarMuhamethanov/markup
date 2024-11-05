"use client";

import React from "react";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import { MarkdownEditorLayout } from "./markdownEditor/MarkdownEditorLayout";
import styles from "./EditorLayout.module.css";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";
import { CreateDocumentModal } from "./filesActionModals/CreateDocumentModal";
import { RenameDocumentModal } from "./filesActionModals/RenameDocumentModal";
import { PdfTargetContext } from "./padConvertation/PdfTargetContext";
import { useSingleLayoutEffect } from "@/core/hooks/useSingleLayoutEffect";
import {
  documentsMenuModel,
  filesDataModel,
  selectedDocumentData,
} from "../model/AppModel";
import { enablePatches } from "immer";

const Modals: React.FC = () => {
  return (
    <>
      <CreateDocumentModal type={"file"} />
      <CreateDocumentModal type={"folder"} />
      <RenameDocumentModal />
    </>
  );
};

const EditorLayout: React.FC = () => {
  useSingleLayoutEffect(() => {
    enablePatches();
    filesDataModel.init();
    selectedDocumentData.init();
    documentsMenuModel.init();
  });

  return (
    <PdfTargetContext.Provider value={{ targetRef: { current: null } }}>
      <Layout className={styles.mainLayout}>
        <Header />
        <Layout hasSider={true} className={styles.contentRow}>
          <Sidebar />
          <Content>
            <MarkdownEditorLayout />
          </Content>
        </Layout>
        <Modals />
      </Layout>
    </PdfTargetContext.Provider>
  );
};

export { EditorLayout };
