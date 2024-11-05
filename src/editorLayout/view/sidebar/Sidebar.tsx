import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.css";
import React from "react";
import { DocumentsMenu } from "./DocumentsMenu";

const cssStyles = {
  backgroundColor: "#fff",
};

const Sidebar: React.FC = () => {
  return (
    <Sider style={cssStyles} className={styles.sidebar} width={220}>
      <DocumentsMenu />
    </Sider>
  );
};

export { Sidebar };
