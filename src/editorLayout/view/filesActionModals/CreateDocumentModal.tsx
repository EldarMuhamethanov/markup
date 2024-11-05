import { observer } from "mobx-react-lite";
import { Input, InputProps, Modal } from "antd";
import { useCallback, useState } from "react";
import styles from "./CreateDocumentModal.module.css";
import { createFileModel, createFolderModel } from "../../model/AppModel";
import { DocumentData } from "../../model/documents/DocumentsMenuModel";

type CreateDocumentModalProps = {
  type: DocumentData["type"];
};

type ModalContentProps = {
  type: DocumentData["type"];
  documentName: string;
  setDocumentName: (documentName: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  onEnter: () => void;
};

const ModalContent = observer(
  ({
    type,
    documentName,
    setDocumentName,
    error,
    setError,
    onEnter,
  }: ModalContentProps) => {
    const _onInput: InputProps["onInput"] = (e) => {
      const value = (e.target as HTMLInputElement).value;
      setDocumentName(value);
      setError(false);
    };

    const _onChange: InputProps["onChange"] = (e) => {
      const value = (e.target as HTMLInputElement).value;
      if (!value) {
        setError(true);
      }
    };

    const description =
      type === "file" ? "Введите имя файла" : "Введите имя папки";

    return (
      <div className={styles.content}>
        <span className={styles.description}>{description}:</span>
        <Input
          placeholder={"Имя файла"}
          value={documentName}
          onInput={_onInput}
          onChange={_onChange}
          status={error ? "error" : ""}
          onPressEnter={onEnter}
        />
      </div>
    );
  }
);

const CreateDocumentModal = observer(({ type }: CreateDocumentModalProps) => {
  const [documentName, setDocumentName] = useState("");
  const [error, setError] = useState(false);

  const _handleOk = useCallback(() => {
    if (!error) {
      if (type === "file") {
        createFileModel.submitCreate(documentName)
      } else {
        createFolderModel.submitCreate(documentName);
      }
    }
  }, [documentName, error, type]);

  const _handleCancel = useCallback(() => {
    if (type === "file") {
      createFileModel.closePopup()
    } else {
      createFolderModel.closePopup();
    }
  }, [type]);

  return (
    <Modal
      title={"Создать файл"}
      open={
        type === "file"
          ? createFileModel.popupOpened
          : createFolderModel.popupOpened
      }
      onOk={_handleOk}
      onCancel={_handleCancel}
    >
      <ModalContent
        type={type}
        documentName={documentName}
        setDocumentName={setDocumentName}
        error={error}
        setError={setError}
        onEnter={_handleOk}
      />
    </Modal>
  );
});

export { CreateDocumentModal };
