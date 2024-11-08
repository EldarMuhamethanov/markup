import React from "react";
import { Modal, Form, Input, Radio, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const subject = `[MarkUp Feedback] ${values.type}: ${values.subject}`;
      const body = values.message;
      const mailtoLink = `mailto:eldarmy@mail.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      form.resetFields();
      onClose();
    });
  };

  return (
    <Modal
      title="Обратная связь"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="type"
          label="Тип обращения"
          rules={[{ required: true, message: "Выберите тип обращения" }]}
        >
          <Radio.Group>
            <Radio value="bug">Сообщить о баге</Radio>
            <Radio value="feature">Предложить улучшение</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="subject"
          label="Тема"
          rules={[{ required: true, message: "Введите тему" }]}
        >
          <Input placeholder="Кратко опишите суть обращения" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Сообщение"
          rules={[{ required: true, message: "Введите сообщение" }]}
        >
          <TextArea
            rows={4}
            placeholder="Подробно опишите проблему или предложение"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { FeedbackModal }; 