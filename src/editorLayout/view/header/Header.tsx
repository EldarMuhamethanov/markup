import styles from "./Header.module.css";
import React from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import { Button, Flex, Typography } from "antd";
import { RightPart } from "./RightPart";
import Image from "next/image";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface HeaderProps {
  sidebarCollapsed: boolean;
  onSidebarCollapse: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onSidebarCollapse }) => {
  return (
    <AntHeader className={styles.header}>
      <Flex
        gap={10}
        style={{ height: "100%", position: "relative" }}
        align="center"
      >
        <Button 
          icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => onSidebarCollapse(!sidebarCollapsed)}
        />
        <Flex align="end">
          <Image src="/NewLogo.png" width={80} height={50} alt="logo" />
          <Typography.Title
            level={3}
            style={{ marginBottom: 0 }}
            className={styles.logoTitle}
          >
            arkUp
          </Typography.Title>
        </Flex>
      </Flex>
      <RightPart />
    </AntHeader>
  );
};

export { Header };
