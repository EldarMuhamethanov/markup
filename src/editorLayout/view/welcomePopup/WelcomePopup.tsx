import React, { useEffect, useState } from "react";
import { Modal, Typography, Button, Card, Row, Col } from "antd";
import {
  EditOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  SaveOutlined,
  FolderOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import styles from "./WelcomePopup.module.css";
import { LocalStorage, STORAGE_KEYS } from "@/core/localStorage/localStorage";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <EditOutlined className={styles.featureIcon} />,
    title: "Умное редактирование",
    description: (
      <ul>
        <li>Автодополнение Markdown-синтаксиса</li>
        <li>Подсветка синтаксиса в реальном времени</li>
        <li>Поддержка таблиц и математических формул</li>
        <li>Вставка изображений и ссылок</li>
        <li>Нумерованные и маркированные списки</li>
      </ul>
    ),
  },
  {
    icon: <FileTextOutlined className={styles.featureIcon} />,
    title: "Мгновенный предпросмотр",
    description: (
      <ul>
        <li>Разделение экрана редактор/предпросмотр</li>
        <li>Настраиваемые размеры панелей</li>
        <li>Синхронизированная прокрутка</li>
        <li>Полноэкранный режим для каждой панели</li>
      </ul>
    ),
  },
  {
    icon: <SaveOutlined className={styles.featureIcon} />,
    title: "Надежное сохранение",
    description: (
      <ul>
        <li>Автосохранение в реальном времени</li>
        <li>Локальное хранение документов</li>
        <li>Интеграция с Google Drive</li>
        <li>Резервное копирование</li>
      </ul>
    ),
  },
  {
    icon: <CloudUploadOutlined className={styles.featureIcon} />,
    title: "Гибкий экспорт",
    description: (
      <ul>
        <li>Экспорт в PDF с сохранением стилей</li>
        <li>Конвертация в HTML</li>
        <li>Сохранение в формате Markdown</li>
        <li>Копирование в буфер обмена</li>
      </ul>
    ),
  },
  {
    icon: <FolderOutlined className={styles.featureIcon} />,
    title: "Организация документов",
    description: (
      <ul>
        <li>Древовидная структура папок</li>
        <li>Поиск по документам</li>
        <li>Drag-and-drop файлов</li>
        <li>Удобная навигация</li>
      </ul>
    ),
  },
  {
    icon: <SyncOutlined className={styles.featureIcon} />,
    title: "Дополнительно",
    description: (
      <ul>
        <li>Быстрые горячие клавиши</li>
        <li>Настраиваемый интерфейс</li>
        <li>Оптимизация для мобильных устройств</li>
        <li>Поддержка различных языков</li>
      </ul>
    ),
  },
];

export const WelcomePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = LocalStorage.getValue<boolean>(
      STORAGE_KEYS.WELCOME_POPUP_SHOWN
    );
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
        width={900}
        footer={[
          <Button key="docs" onClick={() => window.open("https://github.com/EldarMuhamethanov/markup", "_blank")}>
            Документация
          </Button>,
          <Button key="ok" type="primary" size="large" onClick={handleOk}>
            Начать работу
          </Button>,
        ]}
        centered
      >
        <div className={styles.content}>
          <Paragraph className={styles.intro}>
            MarkUp - это современный редактор Markdown, созданный для удобного
            написания документации, заметок и статей. Наш редактор сочетает в себе
            простоту использования и мощный функционал для эффективной работы с текстом.
          </Paragraph>

          <Row gutter={[16, 16]} className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Col xs={24} sm={24} md={12} key={index}>
                <Card className={styles.featureCard}>
                  <div className={styles.featureHeader}>
                    {feature.icon}
                    <Title level={4}>{feature.title}</Title>
                  </div>
                  {feature.description}
                </Card>
              </Col>
            ))}
          </Row>

          <div className={styles.footer}>
            <Paragraph>
              Нажмите <strong>Начать работу</strong>, чтобы приступить к
              использованию редактора. Если вам понадобится помощь, вы всегда
              можете открыть справку по Markdown в меню или посетить нашу документацию.
            </Paragraph>
          </div>
        </div>
      </Modal>
    </div>
  );
};
