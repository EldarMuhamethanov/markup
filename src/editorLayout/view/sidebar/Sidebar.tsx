import Sider from "antd/es/layout/Sider";
import styles from "./Sidebar.module.css";
import React from "react";
import { getStylesWithMods } from "../../../core/styles/getStylesWithMods";
import { DocumentsMenu } from "./DocumentsMenu";

const cssStyles = {
  backgroundColor: "#fff",
};

interface SidebarProps {
  show: boolean;
}

const Sidebar = ({ show }: SidebarProps) => {
  return (
    <Sider
      style={cssStyles}
      className={getStylesWithMods(styles.sidebar, {
        [styles.hiddenSidebar]: !show,
      })}
      width={220}
    >
      <DocumentsMenu />
    </Sider>
  );
};

export { Sidebar };
