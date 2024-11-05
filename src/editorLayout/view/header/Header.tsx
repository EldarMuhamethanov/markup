import styles from "./Header.module.css";
import React from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import { Flex, Typography } from "antd";
import { RightPart } from "./RightPart";
import Image from "next/image";

const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <Flex
        gap={10}
        style={{ height: "100%", position: "relative" }}
        align="center"
      >
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
