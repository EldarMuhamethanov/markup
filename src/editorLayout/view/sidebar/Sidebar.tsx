import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.css";
import React from "react";
import { DocumentsMenu } from "./DocumentsMenu";
import classNames from "classnames";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <Sider 
      className={classNames(styles.sidebar, {
        [styles.collapsed]: collapsed
      })} 
      trigger={null}
    >
      <div className={styles.sidebarContent}>
        <DocumentsMenu />
      </div>
    </Sider>
  );
};

export { Sidebar };
