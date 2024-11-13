import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Steps } from "antd";
import { EditOutlined, FileTextOutlined, CloudUploadOutlined } from "@ant-design/icons";
import styles from "./WelcomePopup.module.css";
import { LocalStorage, STORAGE_KEYS } from "@/core/localStorage/localStorage";

const { Title, Paragraph } = Typography;

const steps = [
  {
    title: "Редактор Markdown",
    icon: <EditOutlined />,
    description: "Создавайте и редактируйте документы с поддержкой полного синтаксиса Markdown, включая таблицы, код и математические формулы.",
  },
  {
    title: "Предпросмотр в реальном времени",
    icon: <FileTextOutlined />,
    description: "Мгновенно видите, как будет выглядеть ваш документ, благодаря режиму разделенного экрана с предпросмотром.",
  },
  {
    title: "Экспорт и импорт",
    icon: <CloudUploadOutlined />,
    description: "Экспортируйте документы в PDF, HTML или Markdown. Импортируйте существующие файлы или сохраняйте в Google Drive.",
  },
];

export const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = LocalStorage.getValue<boolean>(STORAGE_KEYS.WELCOME_POPUP_SHOWN);
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);

  const handleOk = () => {
    LocalStorage.setValue(STORAGE_KEYS.WELCOME_POPUP_SHOWN, true);
    setIsVisible(false);
  };

  return (
    <div className={styles.modalWrapper}>
      <Modal
        title={<Title level={3}>Добро пожаловать в MarkUp! ✨</Title>}
        open={isVisible}
        onOk={handleOk}
        onCancel={handleOk}
        width={700}
        footer={[
          <Button key="ok" type="primary" size="large" onClick={handleOk}>
            Начать работу
          </Button>,
        ]}
        centered
      >
        <div className={styles.content}>
          <Paragraph className={styles.intro}>
            MarkUp - это современный редактор Markdown, созданный для удобного написания документации, 
            заметок и статей. Давайте познакомимся с основными возможностями:
          </Paragraph>

          <Steps
            direction="vertical"
            items={steps}
            className={styles.steps}
            current={3}
          />

          <div className={styles.footer}>
            <Paragraph>
              Нажмите <strong>Начать работу</strong>, чтобы приступить к использованию редактора.
              Если вам понадобится помощь, вы всегда можете открыть справку по Markdown в меню.
            </Paragraph>
          </div>
        </div>
      </Modal>
    </div>
  );
}; 