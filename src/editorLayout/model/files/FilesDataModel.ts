import { makeAutoObservable } from "mobx";
import {
  ContentState,
  ContentStateData,
} from "../../../richtext/model/content/ContentState";
import { FileData, FilesData } from "src/editorLayout/model/files/FileData";
import { FilesApi } from "../../../api/FilesApi";
import { v4 } from "uuid";

class FilesDataModel {
  documentsData: FilesData;

  constructor() {
    makeAutoObservable(this);

    this.documentsData = FilesApi.getAll();
  }

  getNewFile(name: string): FileData {
    const contentState = ContentState.createWithOneParagraph();
    return {
      id: v4(),
      name,
      contentState,
      createdAt: Date.now(),
    };
  }

  createFile(name: string) {
    const newFile = this.getNewFile(name);
    this.documentsData[newFile.id] = newFile;
    FilesApi.addFile(newFile);
  }

  addFile(file: FileData) {
    this.documentsData[file.id] = file;
    FilesApi.addFile(file);
  }

  renameFile(fileId: string, newName: string) {
    if (this.documentsData[fileId]) {
      this.documentsData[fileId].name = newName;
      FilesApi.renameFile(fileId, newName);
    }
  }

  removeFile(fileId: string) {
    if (this.documentsData[fileId]) {
      delete this.documentsData[fileId];
      FilesApi.removeFile(fileId);
    }
  }

  setDocumentContentData(documentId: string, contentState: ContentStateData) {
    if (this.documentsData[documentId]) {
      this.documentsData[documentId].contentState = contentState;
      FilesApi.updateFileContent(documentId, contentState);
    }
  }

  getDocumentContentState(documentId: string): ContentStateData | null {
    return this.documentsData[documentId]?.contentState || null;
  }
}

export { FilesDataModel };

export type { FilesData };
