import { Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import React from "react";
import styles from "../Header.module.css";
import { createMoreMenuItems } from "../constants/menuItems";

interface MobileButtonsProps {
  setIsHelpModalOpen: (value: boolean) => void;
  setIsFeedbackModalOpen: (value: boolean) => void;
}

export const MobileButtons: React.FC<MobileButtonsProps> = ({
  setIsHelpModalOpen,
  setIsFeedbackModalOpen,
}) => (
  <div className={styles.mobileButtons}>
    <Dropdown
      menu={{
        items: createMoreMenuItems(setIsHelpModalOpen, setIsFeedbackModalOpen),
      }}
      trigger={["click"]}
    >
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>
  </div>
); 