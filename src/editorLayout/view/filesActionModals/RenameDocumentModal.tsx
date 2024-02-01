import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { renameDocumentModel } from "../../model/AppModel";
import { Input, InputProps, Modal } from "antd";
import styles from "./CreateDocumentModal.module.css";

type ModalContentProps = {
  documentName: string;
  setDocumentName: (documentName: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  onEnter: () => void;
};

const ModalContent = observer(
  ({
    documentName,
    setDocumentName,
    error,
    setError,
    onEnter,
  }: ModalContentProps) => {
    const _onInput: InputProps["onInput"] = (e) => {
      const value = (e.target as HTMLInputElement).value;
      setDocumentName(value);
    };

    const _onChange: InputProps["onChange"] = (e) => {
      const value = (e.target as HTMLInputElement).value;
      if (!value) {
        setError(true);
      }
    };

    return (
      <div className={styles.content}>
        <span className={styles.description}>Введите новое имя:</span>
        <Input
          placeholder={"Новое имя"}
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

const RenameDocumentModal = observer(() => {
  const [documentName, setDocumentName] = useState("");
  const [error, setError] = useState(false);

  const selectedDocumentName = renameDocumentModel.selectedDocumentName;

  useEffect(() => {
    const fileName = selectedDocumentName;
    fileName && setDocumentName(fileName);
  }, [selectedDocumentName]);

  const _handleOk = useCallback(() => {
    if (!error) {
      renameDocumentModel.submitCreate(documentName);
    }
  }, [documentName, error]);

  const _handleCancel = useCallback(() => renameDocumentModel.closePopup(), []);

  return (
    <Modal
      title={"Создать файл"}
      open={renameDocumentModel.popupOpened}
      onOk={_handleOk}
      onCancel={_handleCancel}
    >
      <ModalContent
        documentName={documentName}
        setDocumentName={setDocumentName}
        error={error}
        setError={setError}
        onEnter={_handleOk}
      />
    </Modal>
  );
});

export { RenameDocumentModal };
