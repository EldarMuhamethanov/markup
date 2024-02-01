import styles from "./Header.module.css";
import React from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface HeaderProps {
  onMenuButtonClick: () => void;
}

const Header = ({ onMenuButtonClick }: HeaderProps) => {
  return (
    <AntHeader className={styles.header}>
      <Button
        type={"primary"}
        icon={<MenuOutlined />}
        size={"middle"}
        onClick={onMenuButtonClick}
      />
      <img src="./MarkupLogo.png" alt="logo" className={styles.logo} />
    </AntHeader>
  );
};

export { Header };
