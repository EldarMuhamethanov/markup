import { makeAutoObservable } from "mobx";
import {
  LocalStorage,
  STORAGE_KEYS,
} from "../../../core/localStorage/localStorage";
import { v4 } from "uuid";
import { SelectedDocumentData } from "./SelectedDocumentData";
import { FilesDataModel } from "../files/FilesDataModel";
import { ContentState } from "../../../richtext/model/content/ContentState";
import { getDocumentData } from "./getDocumentData";
import { DEFAULT_CONTENT } from "@/editorLayout/model/files/defaultContent";

type DocumentData = FileData | FolderData;

type CommonDocumentData = {
  id: string;
  name: string;
  createdAt: number;
};

type FileData = {
  type: "file";
} & CommonDocumentData;

type FolderData = {
  type: "folder";
  files: DocumentData[];
} & CommonDocumentData;

class DocumentsMenuModel {
  documents: DocumentData[] = [];
  openedFolders: string[] = [];

  private _selectedDocumentModel: SelectedDocumentData;
  private _filesDataModel: FilesDataModel;

  constructor(
    selectedDocumentModel: SelectedDocumentData,
    filesDataModel: FilesDataModel
  ) {
    makeAutoObservable(this);

    this._selectedDocumentModel = selectedDocumentModel;
    this._filesDataModel = filesDataModel;
  }

  init() {
    this.documents =
      LocalStorage.getValue<DocumentData[]>(STORAGE_KEYS.DOCUMENTS_DATA) || [];

    if (!this.documents.length) {
      this.initWithDefaultContent();
    }

    this.openedFolders = this._selectedDocumentModel.selectedDocumentId
      ? this._getDocumentPath(
          this._selectedDocumentModel.selectedDocumentId
        ).map((folder) => folder.id)
      : [];
  }

  initWithDefaultContent() {
    if (this.documents.length) {
      return;
    }
    this.createDocument("file", "Добро пожаловать!");
    const documentId = this.documents[0].id;
    const content = ContentState.createByContent(DEFAULT_CONTENT.trim());
    this._filesDataModel.setDocumentContentData(documentId, content);
    this._updateLocalStorageValues();
  }

  renameDocument(documentId: string, newName: string) {
    const documentData = getDocumentData(this.documents, documentId);
    if (documentData) {
      documentData.name = newName;
      if (documentData.type === "file") {
        this._filesDataModel.renameFile(documentId, newName);
      }
    }
    this._selectedDocumentModel.setSelectedDocument(documentId);
    this._updateLocalStorageValues();
  }

  removeDocument(documentId: string) {
    const path = this._getDocumentPath(documentId);
    const document = getDocumentData(this.documents, documentId);

    if (document?.type === "file") {
      this._filesDataModel.removeFile(document.id);
    }

    if (!path.length) {
      this.documents = this.documents.filter(
        (document) => document.id !== documentId
      );
    } else {
      const lastFolder = path[path.length - 1];
      lastFolder.files = lastFolder.files.filter(
        (document) => document.id !== documentId
      );
    }
    this._selectedDocumentModel.setSelectedDocument(null);
    this._updateLocalStorageValues();
  }

  createDocument(type: DocumentData["type"], name: string): string {
    const selectedDocumentId = this._selectedDocumentModel.selectedDocumentId;
    const selectedDocument =
      selectedDocumentId && getDocumentData(this.documents, selectedDocumentId);
    const commonDocumentData: Omit<DocumentData, "type"> = {
      id: v4(),
      name,
      createdAt: Date.now(),
    };
    const newDocument: DocumentData =
      type === "folder"
        ? {
            ...commonDocumentData,
            type: "folder",
            files: [],
          }
        : {
            ...commonDocumentData,
            type: "file",
          };
    if (newDocument.type === "file") {
      this._filesDataModel.addFile({
        id: newDocument.id,
        name: newDocument.name,
        createdAt: newDocument.createdAt,
        contentState: ContentState.createWithOneParagraph(),
      });
    }

    if (selectedDocument && selectedDocument.type === "folder") {
      selectedDocument.files.push(newDocument);
      this._selectedDocumentModel.setSelectedDocument(newDocument.id);
      this._updateLocalStorageValues();
      return newDocument.id;
    } else if (selectedDocument && selectedDocument.type === "file") {
      const selectedDocumentPath = this._getDocumentPath(selectedDocument.id);
      if (selectedDocumentPath.length) {
        const folder: FolderData =
          selectedDocumentPath[selectedDocumentPath.length - 1];
        folder.files.push(newDocument);
        this._selectedDocumentModel.setSelectedDocument(newDocument.id);
        this._updateLocalStorageValues();
        return newDocument.id;
      }
    }
    this.documents.push(newDocument);
    this._selectedDocumentModel.setSelectedDocument(newDocument.id);
    this._updateLocalStorageValues();
    return newDocument.id;
  }

  selectDocument(documentId: string) {
    const document = getDocumentData(this.documents, documentId);
    if (!document) {
      return;
    }
    this._selectedDocumentModel.setSelectedDocument(documentId);
    this._updateLocalStorageValues();
  }

  expandFolders(folderIds: string[]) {
    this.openedFolders = folderIds;
  }

  private _getDocumentPath(documentId: string): FolderData[] {
    const path: FolderData[] = [];
    let resultPath: FolderData[] = [];

    const findInFolder = (folder: FolderData) => {
      path.push(folder);
      for (const document of folder.files) {
        if (resultPath.length) {
          return;
        }
        if (document.id === documentId) {
          resultPath = [...path];
          return;
        }
        if (document.type === "folder") {
          findInFolder(document);
        }
      }
      path.pop();
    };

    const root: FolderData = {
      type: "folder",
      id: "root",
      name: "",
      createdAt: Date.now(),
      files: this.documents,
    };

    findInFolder(root);

    if (resultPath) {
      resultPath.shift();
    }

    return resultPath;
  }

  private _updateLocalStorageValues() {
    LocalStorage.setValue(STORAGE_KEYS.DOCUMENTS_DATA, this.documents);
  }

  importMarkdownFile(fileName: string, content: string) {
    // Убираем расширение .md из имени файла
    const name = fileName.replace(/\.md$/, "");

    // Создаем новый документ
    const documentId = this.createDocument("file", name);

    // Устанавливаем содержимое файла
    const contentState = ContentState.createByContent(content);
    this._filesDataModel.setDocumentContentData(documentId, contentState);

    this._updateLocalStorageValues();
  }
}

export { DocumentsMenuModel };
export type { DocumentData, FileData, FolderData };
