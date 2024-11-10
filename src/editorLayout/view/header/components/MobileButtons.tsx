import { Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "../Header.module.css";
import { createMoreMenuItems } from "../constants/menuItems";
import { MarkdownHelpModal } from "../MarkdownHelpModal";
import { FeedbackModal } from "../FeedbackModal";

export const MobileButtons: React.FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <div className={styles.mobileButtons}>
      <Dropdown
        menu={{
          items: createMoreMenuItems(setIsHelpModalOpen, setIsFeedbackModalOpen),
        }}
        trigger={["click"]}
      >
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
      <MarkdownHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
}; 