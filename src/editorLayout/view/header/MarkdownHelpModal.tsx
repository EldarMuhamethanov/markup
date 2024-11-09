import React from "react";
import { Modal, Typography, Divider } from "antd";
import styles from "./MarkdownHelpModal.module.css";

const { Title, Text } = Typography;

interface MarkdownHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarkdownHelpModal: React.FC<MarkdownHelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Руководство по Markdown"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className={styles.content}>
        <section>
          <Title level={4}>Базовое форматирование</Title>
          <div className={styles.example}>
            <Text>**Жирный текст**</Text>
            <Text type="secondary">→ <Text strong>Жирный текст</Text></Text>
          </div>
          <div className={styles.example}>
            <Text>*Курсив*</Text>
            <Text type="secondary">→ <Text italic>Курсив</Text></Text>
          </div>
          <div className={styles.example}>
            <Text>~~Зачеркнутый текст~~</Text>
            <Text type="secondary">→ <Text delete>Зачеркнутый текст</Text></Text>
          </div>
          <div className={styles.example}>
            <Text>^Надстрочный^</Text>
            <Text type="secondary">→ <Text style={{ verticalAlign: 'super' }}>Надстрочный</Text></Text>
          </div>
          <div className={styles.example}>
            <Text>~Подстрочный~</Text>
            <Text type="secondary">→ <Text style={{ verticalAlign: 'sub' }}>Подстрочный</Text></Text>
          </div>
          <div className={styles.example}>
            <Text>==Выделенный==</Text>
            <Text type="secondary">→ <Text mark>Выделенный</Text></Text>
          </div>
        </section>

        <Divider />

        <section>
          <Title level={4}>Заголовки</Title>
          <div className={styles.example}>
            <Text># Заголовок 1</Text>
            <Text type="secondary">→ <Title level={1} style={{margin: 0}}>Заголовок 1</Title></Text>
          </div>
          <div className={styles.example}>
            <Text>## Заголовок 2</Text>
            <Text type="secondary">→ <Title level={2} style={{margin: 0}}>Заголовок 2</Title></Text>
          </div>
          <div className={styles.example}>
            <Text>### Заголовок 3</Text>
            <Text type="secondary">→ <Title level={3} style={{margin: 0}}>Заголовок 3</Title></Text>
          </div>
          <div className={styles.example}>
            <Text>#### Заголовок 4</Text>
            <Text type="secondary">→ <Title level={4} style={{margin: 0}}>Заголовок 4</Title></Text>
          </div>
          <div className={styles.example}>
            <Text>##### Заголовок 5</Text>
            <Text type="secondary">→ <Title level={5} style={{margin: 0}}>Заголовок 5</Title></Text>
          </div>
        </section>

        <Divider />

        <section>
          <Title level={4}>Списки</Title>
          <div className={styles.example}>
            <div>
              <Text>- Элемент списка</Text>
              <br />
              <Text>  - Вложенный элемент</Text>
            </div>
            <Text type="secondary">→ Маркированный список</Text>
          </div>
          <div className={styles.example}>
            <div>
              <Text>1. Первый элемент</Text>
              <br />
              <Text>2. Второй элемент</Text>
            </div>
            <Text type="secondary">→ Нумерованный список</Text>
          </div>
        </section>

        <Divider />

        <section>
          <Title level={4}>Цитаты и код</Title>
          <div className={styles.example}>
            <Text>&gt; Цитата</Text>
            <Text type="secondary">→ Блок цитаты</Text>
          </div>
          <div className={styles.example}>
            <Text>`код`</Text>
            <Text type="secondary">→ Встроенный код</Text>
          </div>
          <div className={styles.example}>
            <div>
              <Text>```</Text>
              <br />
              <Text>блок кода</Text>
              <br />
              <Text>```</Text>
            </div>
            <Text type="secondary">→ Блок кода</Text>
          </div>
        </section>

        <Divider />

        <section>
          <Title level={4}>Дополнительные элементы</Title>
          <div className={styles.example}>
            <Text>---</Text>
            <Text type="secondary">→ Горизонтальная линия</Text>
          </div>
          <div className={styles.example}>
            <Text>[Текст ссылки](url)</Text>
            <Text type="secondary">→ <a href="#">Текст ссылки</a></Text>
          </div>
          <div className={styles.example}>
            <Text>![Описание](url-изображения)</Text>
            <Text type="secondary">→ Изображение</Text>
          </div>
        </section>

        <Divider />

        <section>
          <Title level={4}>Сноски</Title>
          <div className={styles.example}>
            <div>
              <Text>Текст с сноской[^1]</Text>
              <br />
              <Text>[^1]: Содержание сноски</Text>
            </div>
            <Text type="secondary">→ Текст с сноской<sup>1</sup></Text>
          </div>
          <div className={styles.example}>
            <Text>Можно использовать [^метка] с любым текстом</Text>
            <Text type="secondary">→ Идентификатор сноски может быть любым текстом</Text>
          </div>
          <div className={styles.example}>
            <Text>[^метка]: Сноски отображаются в конце документа</Text>
            <Text type="secondary">→ Определение сноски можно разместить в любом месте</Text>
          </div>
        </section>
      </div>
    </Modal>
  );
};

export { MarkdownHelpModal }; 