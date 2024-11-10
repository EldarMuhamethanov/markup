import { Button, Tooltip } from "antd";
import { GithubOutlined, QuestionCircleOutlined, MessageOutlined } from "@ant-design/icons";
import React from "react";
import styles from "../Header.module.css";

interface DesktopButtonsProps {
  onHelpClick: () => void;
  onFeedbackClick: () => void;
}

export const DesktopButtons: React.FC<DesktopButtonsProps> = ({
  onHelpClick,
  onFeedbackClick,
}) => (
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
        onClick={onHelpClick}
      >
        Справка по Markdown
      </Button>
    </Tooltip>
    <Tooltip title="Оставить отзыв">
      <Button
        type="text"
        icon={<MessageOutlined />}
        onClick={onFeedbackClick}
      >
        Обратная связь
      </Button>
    </Tooltip>
  </div>
); 