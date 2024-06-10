import { makeAutoObservable } from "mobx";
import { DocumentsMenuModel } from "../documents/DocumentsMenuModel";
import { getDocumentData } from "../documents/getDocumentData";

class RenameDocumentModel {
  popupOpened = false;
  selectedDocumentId: string | null = null;

  private documentsMenuModel: DocumentsMenuModel;
  constructor(documentsMenuModel: DocumentsMenuModel) {
    makeAutoObservable(this);

    this.documentsMenuModel = documentsMenuModel;
  }

  submitCreate(fileName: string) {
    if (this.selectedDocumentId) {
      this.documentsMenuModel.renameDocument(this.selectedDocumentId, fileName);
    }
    this.closePopup();
  }

  openPopup(documentId: string) {
    this.selectedDocumentId = documentId;
    this.popupOpened = true;
  }

  closePopup() {
    this.popupOpened = false;
  }

  get selectedDocumentName(): string | null {
    if (this.selectedDocumentId) {
      return (
        getDocumentData(
          this.documentsMenuModel.documents,
          this.selectedDocumentId
        )?.name || null
      );
    }
    return null;
  }
}

export { RenameDocumentModel };
