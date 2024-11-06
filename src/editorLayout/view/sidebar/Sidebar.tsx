import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.css";
import React from "react";
import { DocumentsMenu } from "./DocumentsMenu";

const Sidebar: React.FC = () => {
  return (
    <Sider className={styles.sidebar} width={220}>
      <div className={styles.sidebarContent}>
        <DocumentsMenu />
      </div>
    </Sider>
  );
};

export { Sidebar };
