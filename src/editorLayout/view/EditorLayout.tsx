import React, { useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import { MarkdownEditorLayout } from "./markdownEditor/MarkdownEditorLayout";
import styles from "./EditorLayout.module.css";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";
import { CreateDocumentModal } from "./filesActionModals/CreateDocumentModal";
import { RenameDocumentModal } from "./filesActionModals/RenameDocumentModal";

const Modals = () => {
  return (
    <>
      <CreateDocumentModal type={"file"} />
      <CreateDocumentModal type={"folder"} />
      <RenameDocumentModal />
    </>
  );
};

const EditorLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Layout className={styles.mainLayout}>
      <Header onMenuButtonClick={() => setShowSidebar(!showSidebar)} />
      <Layout hasSider={true} className={styles.contentRow}>
        <Sidebar show={showSidebar} />
        <Content>
          <MarkdownEditorLayout />
        </Content>
      </Layout>
      <Modals />
    </Layout>
  );
};

export { EditorLayout };
