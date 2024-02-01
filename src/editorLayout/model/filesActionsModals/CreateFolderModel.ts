import { DocumentsMenuModel } from "../documents/DocumentsMenuModel";
import { makeAutoObservable } from "mobx";

class CreateFolderModel {
  popupOpened = false;

  private documentsMenuModel: DocumentsMenuModel;
  constructor(documentsMenuModel: DocumentsMenuModel) {
    makeAutoObservable(this);

    this.documentsMenuModel = documentsMenuModel;
  }

  submitCreate(folderName: string) {
    this.documentsMenuModel.createDocument("folder", folderName);
    this.closePopup();
  }

  openPopup() {
    this.popupOpened = true;
  }

  closePopup() {
    this.popupOpened = false;
  }
}

export { CreateFolderModel };
