import { makeAutoObservable } from "mobx";
import { FilesDataModel } from "../files/FilesDataModel";
import { ContentStateData } from "../../../richtext/model/content/ContentState";
import { FilesApi } from "../../../api/FilesApi";

class SelectedDocumentData {
  selectedDocumentId: string | null;

  private _filesDataModel: FilesDataModel;

  constructor(filesDataModel: FilesDataModel) {
    makeAutoObservable(this);
    this._filesDataModel = filesDataModel;

    this.selectedDocumentId = FilesApi.getSelectedFileId();
  }

  setSelectedDocument(documentId: string | null) {
    this.selectedDocumentId = documentId;
    FilesApi.setSelectedFile(documentId);
  }

  setContentState(contentState: ContentStateData) {
    if (this.selectedDocumentId) {
      this._filesDataModel.setDocumentContentData(
        this.selectedDocumentId,
        contentState
      );
    }
  }

  get contentState() {
    if (this.selectedDocumentId) {
      return this._filesDataModel.getDocumentContentState(
        this.selectedDocumentId
      );
    }
    return null;
  }

  get fileName() {
    if (this.selectedDocumentId) {
      return (
        this._filesDataModel.documentsData[this.selectedDocumentId]?.name || ""
      );
    }
    return null;
  }
}

export { SelectedDocumentData };
