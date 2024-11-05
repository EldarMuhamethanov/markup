import styles from "./Header.module.css";
import React from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import { MenuOutlined } from "@ant-design/icons";
import {Button, Image} from "antd";
import { RightPart } from "./RightPart";

interface HeaderProps {
  onMenuButtonClick: () => void;
}

const Header = ({ onMenuButtonClick }: HeaderProps) => {
  return (
    <AntHeader className={styles.header}>
      <div className={styles.leftPart}>
        <Button
          type={"primary"}
          icon={<MenuOutlined />}
          size={"middle"}
          onClick={onMenuButtonClick}
        />
        <Image src="/MarkupLogo.png" preview={false} className={styles.logo} alt="logo" />
      </div>
      <RightPart />
    </AntHeader>
  );
};

export { Header };
