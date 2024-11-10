import { Button, Tooltip } from "antd";
import { GithubOutlined, QuestionCircleOutlined, MessageOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "../Header.module.css";
import { MarkdownHelpModal } from "../MarkdownHelpModal";
import { FeedbackModal } from "../FeedbackModal";

export const DesktopButtons: React.FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  return (
    <div className={styles.desktopButtons}>
      <Tooltip title="Открыть репозиторий проекта">
        <Button
          type="text"
          icon={<GithubOutlined />}
          onClick={() =>
            window.open("https://github.com/EldarMuhamethanov/markup", "_blank")
          }
        >
          GitHub
        </Button>
      </Tooltip>
      <Tooltip title="Открыть справку по Markdown">
        <Button
          type="text"
          icon={<QuestionCircleOutlined />}
          onClick={() => setIsHelpModalOpen(true)}
        >
          Справка по Markdown
        </Button>
      </Tooltip>
      <Tooltip title="Оставить отзыв">
        <Button
          type="text"
          icon={<MessageOutlined />}
          onClick={() => setIsFeedbackModalOpen(true)}
        >
          Обратная связь
        </Button>
      </Tooltip>
      
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