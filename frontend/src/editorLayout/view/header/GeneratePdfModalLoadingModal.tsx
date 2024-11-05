import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Space, Spin } from "antd";
import React from "react";

type Props = {
  isOpen: boolean;
};

const GeneratePdfModalLoadingModal: React.FC<Props> = ({ isOpen }) => {
  return (
    <Modal
      open={isOpen}
      footer={false}
      closable={false}
      title={"Генерация PDF"}
      centered={true}
    >
      <Space direction={"vertical"} align={"center"} size={40}>
        <span>
          Как только документ будет готов, он будет автоматически скачан
        </span>
        <Space>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Space>
      </Space>
    </Modal>
  );
};

export { GeneratePdfModalLoadingModal };
