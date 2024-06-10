import { makeAutoObservable } from "mobx";
import { DocumentsMenuModel } from "../documents/DocumentsMenuModel";

class CreateFileModel {
  popupOpened = false;

  private documentsMenuModel: DocumentsMenuModel;
  constructor(documentsMenuModel: DocumentsMenuModel) {
    makeAutoObservable(this);

    this.documentsMenuModel = documentsMenuModel;
  }

  submitCreate(fileName: string) {
    this.documentsMenuModel.createDocument("file", fileName);
    this.closePopup();
  }

  openPopup() {
    this.popupOpened = true;
  }

  closePopup() {
    this.popupOpened = false;
  }
}

export { CreateFileModel };
